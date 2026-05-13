import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Send, User, Bot, Shield, ChevronLeft } from 'lucide-angular';
import { HeroStateService } from '../../core/services/hero-state.service';
import { N8nApiService } from '../../core/services/n8n-api.service';

interface ChatMessage {
  role: 'user' | 'ia';
  content: string;
}

@Component({
  selector: 'app-forge',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="h-screen flex bg-background text-white overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-80 border-r border-white/10 bg-white/5 flex flex-col p-6 hidden md:flex backdrop-blur-xl z-20">
        <div class="mb-8 flex items-center justify-between">
          <h2 class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <lucide-icon [img]="ShieldIcon" class="w-6 h-6 text-primary"></lucide-icon>
            Status do Herói
          </h2>
          <button (click)="goBack()" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white" title="Trocar Trilha">
             <lucide-icon [img]="ChevronLeftIcon" class="w-5 h-5"></lucide-icon>
          </button>
        </div>
        
        <div class="bg-black/20 rounded-xl p-5 border border-white/5">
          <p class="text-sm text-white/50 mb-1">Trilha Escolhida</p>
          <p class="text-lg font-semibold text-primary mb-4">{{ heroTrack() || 'Nenhuma' }}</p>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <span class="text-white/60">Nível</span>
              <span class="font-medium">Iniciante</span>
            </div>
            <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div class="bg-success h-full w-1/4 rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="flex-1 flex flex-col relative">
        <!-- Mobile Header -->
        <header class="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-md z-20">
          <div class="flex items-center gap-3">
            <button (click)="goBack()" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <lucide-icon [img]="ChevronLeftIcon" class="w-5 h-5"></lucide-icon>
            </button>
            <span class="font-semibold text-primary">{{ heroTrack() }}</span>
          </div>
        </header>

        <!-- Chat History -->
        <div class="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 relative z-10 custom-scrollbar pb-32">
          
          @if (messages().length === 0) {
            <div class="h-full flex flex-col items-center justify-center text-center opacity-60">
              <lucide-icon [img]="BotIcon" class="w-16 h-16 mb-4 text-white/40"></lucide-icon>
              <h3 class="text-xl font-medium mb-2">Bem-vindo à Forja</h3>
              <p class="max-w-md">Faça uma pergunta sobre {{ heroTrack() }} para iniciar sua jornada de aprendizado.</p>
            </div>
          }

          @for (msg of messages(); track $index) {
            <div class="flex gap-4" [class.flex-row-reverse]="msg.role === 'user'">
              <!-- Avatar -->
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                   [ngClass]="msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'">
                @if (msg.role === 'user') {
                  <lucide-icon [img]="UserIcon" class="w-5 h-5"></lucide-icon>
                } @else {
                  <lucide-icon [img]="BotIcon" class="w-5 h-5"></lucide-icon>
                }
              </div>
              
              <!-- Message Bubble -->
              <div class="max-w-[80%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm"
                   [ngClass]="msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/10 text-white/90 border border-white/5 rounded-tl-none'">
                {{ msg.content }}
              </div>
            </div>
          }

          <!-- Loading Shimmer -->
          @if (isLoading()) {
            <div class="flex gap-4 animate-pulse">
              <div class="w-10 h-10 rounded-full bg-white/10 flex-shrink-0"></div>
              <div class="max-w-[80%] bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-4 space-y-3 w-64">
                <div class="h-2 bg-white/10 rounded w-3/4"></div>
                <div class="h-2 bg-white/10 rounded w-1/2"></div>
                <div class="h-2 bg-white/10 rounded w-5/6"></div>
              </div>
            </div>
          }
        </div>

        <!-- Input Area -->
        <div class="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent z-20 pt-20">
          <div class="max-w-4xl mx-auto relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary/30 to-success/30 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
            <div class="relative flex items-center bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <input 
                type="text" 
                [(ngModel)]="currentInput"
                (keyup.enter)="sendMessage()"
                [disabled]="isLoading()"
                placeholder="Pergunte ao seu mentor..." 
                class="flex-1 bg-transparent border-none text-white px-6 py-4 focus:outline-none focus:ring-0 placeholder-white/40 disabled:opacity-50"
              />
              <button 
                (click)="sendMessage()"
                [disabled]="!currentInput.trim() || isLoading()"
                class="p-4 text-primary hover:text-primary/80 disabled:opacity-30 disabled:hover:text-primary transition-colors"
              >
                <lucide-icon [img]="SendIcon" class="w-6 h-6"></lucide-icon>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
  `]
})
export class ForgeComponent {
  private heroState = inject(HeroStateService);
  private n8nApi = inject(N8nApiService);
  private router = inject(Router);

  // Icons
  SendIcon = Send;
  UserIcon = User;
  BotIcon = Bot;
  ShieldIcon = Shield;
  ChevronLeftIcon = ChevronLeft;

  heroTrack = this.heroState.selectedTrack;
  messages = signal<ChatMessage[]>([]);
  isLoading = signal<boolean>(false);
  currentInput = '';

  constructor() {
    // Redirecionar se não houver trilha escolhida
    if (!this.heroTrack()) {
      this.router.navigate(['/quest']);
    }
  }

  goBack() {
    this.router.navigate(['/quest']);
  }

  sendMessage() {
    if (!this.currentInput.trim() || this.isLoading()) return;

    const userMessage = this.currentInput.trim();
    this.currentInput = '';
    
    // Add User Message
    this.messages.update(msgs => [...msgs, { role: 'user', content: userMessage }]);
    this.isLoading.set(true);

    const payload = {
      subject: this.heroTrack() || 'Geral',
      user_prompt: userMessage
    };

    this.n8nApi.sendMessage(payload).subscribe({
      next: (response) => {
        // Supondo que a resposta do N8N tenha um campo text/content
        const reply = response?.reply || 'Esta é uma resposta simulada do mentor (Integração N8N bem-sucedida, porém payload não contém texto).';
        this.messages.update(msgs => [...msgs, { role: 'ia', content: reply }]);
        this.isLoading.set(false);
      },
      error: (err) => {
        // Como o webhook pode não existir, vamos simular o sucesso pro usuário ver o visual
        console.error('N8N Webhook error:', err);
        setTimeout(() => {
          this.messages.update(msgs => [...msgs, { role: 'ia', content: `Ops! A conexão com a Forja (N8N) falhou. Mas a simulação de tela está funcionando perfeitamente! Você perguntou sobre: "${userMessage}" no contexto de ${this.heroTrack()}.` }]);
          this.isLoading.set(false);
        }, 1500);
      }
    });
  }
}
