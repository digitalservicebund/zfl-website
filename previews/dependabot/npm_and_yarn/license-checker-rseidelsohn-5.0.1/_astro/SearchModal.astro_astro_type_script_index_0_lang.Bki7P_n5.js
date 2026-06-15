import{t as e}from"./component-ui.BD29HHw-.js";function t(e,t){let r=e.trim().toLowerCase(),i=r.length<=3;if(!r||i)return;let a=Math.floor(r.length*.3),o,s=a+1;for(let e of t){let t=e.trim().toLowerCase();if(!t)continue;if(t.startsWith(r)||r.startsWith(t))return;let i=n(r,t);i<s&&(s=i,o=e)}return o}function n(e,t){if(e===t)return 0;if(e.length===0)return t.length;if(t.length===0)return e.length;let n=Array.from({length:t.length+1},(e,t)=>t),r=Array(t.length+1);for(let i=1;i<=e.length;i+=1){r[0]=i;for(let a=1;a<=t.length;a+=1){let o=e[i-1]===t[a-1]?0:1;r[a]=Math.min(n[a]+1,r[a-1]+1,n[a-1]+o)}[n,r]=[r,n]}return n[t.length]}var r=class extends HTMLElement{instance=null;term=``;fuzzyKeywords=[];connectedCallback(){this.className=`pf-summary`;let t=this.getAttribute(`instance`)||`default`;this.instance=e().getInstance(t),this.fuzzyKeywords=this.dataset.fuzzyKeywords?.split(`.`)??[],this.on(`search`,e=>this.term=e),this.on(`loading`,()=>this.textContent=``),this.on(`results`,this.renderResults.bind(this)),this.on(`error`,this.renderError.bind(this))}on(e,t){this.instance?.on(e,t,this)}renderResults(e){if(!e||!this.term)return;let n=e.results?.length??0,r=t(this.term,this.fuzzyKeywords);console.log(this.fuzzyKeywords),console.log(r),this.renderResultCount(n,this.term),r?this.renderSuggestion(r):n===0&&this.renderNoResultsTips()}renderError(){this.innerHTML=`
      <div class="kern-alert kern-alert--info" role="alert">
        <div class="kern-alert__header">
          <span class="kern-icon kern-icon--info" aria-hidden="true"></span>
          <span class="kern-title">Hinweis</span>
        </div>
        <div class="kern-alert__body">
          <p class="kern-body">Suche nicht verfügbar. Bitte laden Sie die Seite neu oder versuchen Sie es später noch einmal.</p>
        </div>
      </div>
    `}renderResultCount(e,t){let n=e===1?`Ergebnis`:`Ergebnisse`;this.innerHTML=`
      <p>
        ${e||`Keine`} ${n} für <strong>${this.escapeHtml(t)}</strong>
      </p>`}renderSuggestion(e){this.innerHTML+=`
      <p>
        Meinten Sie vielleicht
        <button id="alternativeTerm" class="text-link">${this.escapeHtml(e)}</button>?
      </p>
    `,this.querySelector(`button#alternativeTerm`)?.addEventListener(`click`,()=>this.searchTerm(e))}renderNoResultsTips(){this.innerHTML+=`
      <ul>
        <li>Überprüfen Sie, ob alle Wörter richtig geschrieben sind</li>
        <li>Probieren Sie einen allgemeineren Suchbegriff</li>
      </ul>
    `}searchTerm(e){let t=this.closest(`pagefind-modal`)?.querySelector(`input.pf-input`);t&&(t.value=e,t.focus(),t.dispatchEvent(new Event(`input`,{bubbles:!0})))}escapeHtml(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}};customElements.get(`search-modal-summary`)||customElements.define(`search-modal-summary`,r);