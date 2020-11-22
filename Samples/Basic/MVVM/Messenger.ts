// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RefObject } from 'react';
import { Constructor } from '@dolittle/types';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MessageHandler } from './MessageHandler';
import { Message } from './Message';
import { IMessenger } from './IMessenger';

export class Messenger implements IMessenger {
    private _source: string;
    private _otherSource: string;
    private _messages: Subject<Message> = new Subject();
    private _documentListeners: Map<Constructor, boolean> = new Map();

    constructor() {
        this._source = this.getSource();
        this._otherSource = this.getOtherSource();
    }

    observeAll(): Observable<Message> {
        return this._messages;
    }

    observe<T>(type: Constructor<T>): Observable<T> {
        this.ensureDocumentListenerFor(type);
        const observable = this._messages.pipe(
            filter(_ => _.type === type),
            map(_ => _.content)
        );
        return observable;
    }

    subscribeTo<T>(type: Constructor<T>, handler: MessageHandler<T>): void {
        this.ensureDocumentListenerFor(type);
        const observable = this.observe(type);
        observable.subscribe(_ => handler(_));
    }

    publish(message: any) {
        this._messages.next({ source: this._source, type: message.constructor, content: message });
    }

    private ensureDocumentListenerFor<T>(type: Constructor<T>) {
        if (this._documentListeners.has(type)) {
            return;
        }

        window.document.addEventListener(type.name, (event: any) => {
            this._messages.next({ source: this._otherSource, type, content: event.detail });
        });

        this._documentListeners.set(type, true);
    }

    private getSource() {
        return (window.parent !== window) ? 'content' : 'portal';
    }

    private getOtherSource() {
        return (window.parent !== window) ? 'portal' : 'content';
    }

    private dispatchMessageAsCustomEventTo(document: Document, message: any) {
        const event = new CustomEvent(message.constructor.name, { detail: message });
        document.dispatchEvent(event);
    }
}