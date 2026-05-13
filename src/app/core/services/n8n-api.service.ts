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
  // URL do webhook do N8N (Modo Produção)
  private readonly webhookUrl = 'https://hasselmanno.app.n8n.cloud/webhook/pgdh-mentor';

  sendMessage(payload: ChatPayload): Observable<any> {
    return this.http.post(this.webhookUrl, payload);
  }
}
