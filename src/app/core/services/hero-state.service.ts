import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroStateService {
  private readonly heroTrack = signal<string | null>(null);

  get selectedTrack() {
    return this.heroTrack.asReadonly();
  }

  setTrack(track: string) {
    this.heroTrack.set(track);
  }

  clearTrack() {
    this.heroTrack.set(null);
  }
}
