import{t as e}from"./component-ui.CPIQeVfQ.js";var t=class extends HTMLElement{instance=null;term=``;containerEl=null;connectedCallback(){this.containerEl=document.createElement(`div`),this.containerEl.className=`pf-summary`,this.appendChild(this.containerEl);let t=this.getAttribute(`instance`)||`default`;this.instance=e().getInstance(t),this.register(this.instance)}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}register(e){e.on(`search`,e=>{this.term=e},this),e.on(`loading`,()=>{this.containerEl&&(this.containerEl.textContent=``)},this),e.on(`results`,e=>{if(!e||!this.term||!this.containerEl)return;let t=e.results?.length??0;if(t>0){let e=t===1?`Ergebnis`:`Ergebnisse`;this.containerEl.innerHTML=`<p>${t} ${e} für <strong>${this.escapeHtml(this.term)}</strong></p>`;return}this.containerEl.innerHTML=`
          <p>Keine Ergebnisse für <strong>${this.escapeHtml(this.term)}</strong></p>
          <ul>
            <li>Überprüfen Sie, ob alle Wörter richtig geschrieben sind</li>
            <li>Probieren Sie einen allgemeineren Suchbegriff</li>
          </ul>
        `},this),e.on(`error`,()=>{this.containerEl&&(this.containerEl.innerHTML=`
        <div class="kern-alert kern-alert--info" role="alert">
          <div class="kern-alert__header">
            <span class="kern-icon kern-icon--info" aria-hidden="true"></span>
            <span class="kern-title">Hinweis</span>
          </div>
          <div class="kern-alert__body">
            <p class="kern-body">Suche nicht verfügbar. Bitte laden Sie die Seite neu oder versuchen Sie es später noch einmal.</p>
          </div>
        </div>
      `)})}};customElements.get(`search-modal-summary`)||customElements.define(`search-modal-summary`,t);