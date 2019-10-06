import { Injectable } from '@angular/core';
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Injectable()
export class CommunicatorService {
    value: number;
    getInputValuePromise: Promise<string>;
    sendData: (status) => number;
    getData(status: boolean) {
        let serviceRef = this;
        const observable = new Observable<number>(function subscribe(subscriber) {
            let intervalId = setInterval(() => {
                if (serviceRef.sendData) {
                    subscriber.next(serviceRef.sendData(status));
                    subscriber.complete();
                    clearInterval(intervalId);
                }
            }, 10);
        });
        return observable;
    }
    storeData() {
        this.value = this.sendData(status);
    }
    getDataByStartObservable(status) {
        return Observable
    }

    iGiveYouAPromise(value: string) {
        return new Promise<string>(function (resolve, reject) {
            if (value === '') {
                reject('Name not entered')
            } else {
                setTimeout(function () {
                    resolve(value);
                }, 1500);
            }
        });
    }
    getFullNameWithHelpOfPromise(){
        return new Observable((subscriber)=>{
            this.getInputValuePromise.then((resolveVal)=>{
                subscriber.next(resolveVal);
                subscriber.complete();
            }, (rejectVal)=>{
                subscriber.error(rejectVal);
            })
        })
    }
}