import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatPayload {
  subject: string;
  user_prompt: string;
}

@Injectable({
  providedIn: 'root'
})
export class N8nApiService {
  private http = inject(HttpClient);
  // URL genérica para fins de demonstração
  private readonly webhookUrl = 'https://n8n.example.com/webhook/chat';

  sendMessage(payload: ChatPayload): Observable<any> {
    return this.http.post(this.webhookUrl, payload);
  }
}
