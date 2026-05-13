import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Server, Monitor, ShieldCheck, Activity, Layers } from 'lucide-angular';
import { HeroStateService } from '../../core/services/hero-state.service';

interface Track {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
}

@Component({
  selector: 'app-quest',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      <!-- Background Effects -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <!-- Progress Bar -->
      <div class="absolute top-0 left-0 w-full h-1 bg-white/5">
        <div class="h-full bg-primary transition-all duration-700 ease-out" [style.width]="selectedTrack() ? '100%' : '50%'"></div>
      </div>

      <div class="z-10 text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Escolha seu Destino</h1>
        <p class="text-white/60 text-lg max-w-lg mx-auto">
          Selecione uma trilha para começar sua jornada de aprendizado na PGDH.
        </p>
      </div>

      <!-- Tracks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full z-10">
        @for (track of tracks; track track.id) {
          <div 
            (click)="selectTrack(track)"
            class="relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border"
            [class]="selectedTrack()?.id === track.id ? 'bg-white/10 border-primary scale-[1.02] shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'"
            style="backdrop-filter: blur(16px);"
          >
            <!-- Selection indicator -->
            @if (selectedTrack()?.id === track.id) {
              <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl pointer-events-none"></div>
            }

            <div class="flex items-center space-x-4 mb-4 relative z-10">
              <div class="p-3 rounded-xl" [ngClass]="track.color">
                <lucide-icon [img]="track.icon" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-xl font-semibold text-white">{{ track.name }}</h3>
            </div>
            <p class="text-white/70 relative z-10">{{ track.description }}</p>
          </div>
        }
      </div>

      <!-- Action Button -->
      <div class="mt-16 z-10 min-h-[60px]">
        @if (selectedTrack()) {
          <button 
            (click)="continueJourney()"
            class="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center gap-2"
          >
            Iniciar Jornada
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class QuestComponent {
  private router = inject(Router);
  private heroState = inject(HeroStateService);

  readonly tracks: Track[] = [
    { id: 'backend', name: 'Back-End', icon: Server, description: 'Domine servidores, bancos de dados e arquiteturas escaláveis.', color: 'bg-blue-500/20' },
    { id: 'frontend', name: 'Front-End', icon: Monitor, description: 'Crie interfaces incríveis e experiências interativas.', color: 'bg-purple-500/20' },
    { id: 'fullstack', name: 'Fullstack', icon: Layers, description: 'O mestre de ambos os mundos. Do banco ao navegador.', color: 'bg-primary/20' },
    { id: 'qa', name: 'QA', icon: ShieldCheck, description: 'Garanta a qualidade e a resiliência de cada linha de código.', color: 'bg-emerald-500/20' },
    { id: 'devops', name: 'DevOps', icon: Activity, description: 'Automatize processos e mantenha tudo rodando perfeitamente.', color: 'bg-orange-500/20' },
  ];

  selectedTrack = signal<Track | null>(null);

  selectTrack(track: Track) {
    this.selectedTrack.set(track);
    // Tocar um pequeno som sintético de click seria ideal aqui
    // const audio = new Audio('/assets/click.mp3');
    // audio.play().catch(() => {});
  }

  continueJourney() {
    const track = this.selectedTrack();
    if (track) {
      this.heroState.setTrack(track.name);
      this.router.navigate(['/forge']);
    }
  }
}
