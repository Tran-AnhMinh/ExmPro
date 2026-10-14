import { Injectable } from '@angular/core';

function isBrowser(): boolean {
    try {
        return typeof localStorage !== 'undefined';
    } catch {
        return false;
    }
}

@Injectable({
    providedIn: 'root'
})
export class DataTask {
    constructor() { }

    static setItem(key: string, value: any) {
        if (!isBrowser()) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error setting item in localStorage:', e);
        }
    }

    static getItem(key: string): any {
        if (!isBrowser()) return [];
        try {
            const raw = localStorage.getItem(key);
            const parsed = JSON.parse(raw || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            localStorage.removeItem(key);
            return [];
        }
    }

    static removeItem(key: string): void {
        if (!isBrowser()) return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from local storage', e);
        }
    }

    static clear(): void {
        if (!isBrowser()) return;
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error clearing local storage', e);
        }
    }
}
