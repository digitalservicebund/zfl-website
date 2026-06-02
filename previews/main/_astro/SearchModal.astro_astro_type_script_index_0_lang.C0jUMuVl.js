import{t as e}from"./component-ui.DTSeg26Z.js";function t(e,t){let r=e.trim();if(!r)return;let i=r.length<=3?0:Math.floor(r.length*.3),a,o=i+1;for(let e of t){let t=n(r,e);if(t===0)return;t<o&&(o=t,a=e)}return a}function n(e,t){let n=e.trim().toLowerCase(),r=t.trim().toLowerCase();if(n===r)return 0;if(n.length===0)return r.length;if(r.length===0)return n.length;let i=Array.from({length:r.length+1},(e,t)=>t),a=Array(r.length+1);for(let e=1;e<=n.length;e+=1){a[0]=e;for(let t=1;t<=r.length;t+=1){let o=n[e-1]===r[t-1]?0:1;a[t]=Math.min(i[t]+1,a[t-1]+1,i[t-1]+o)}[i,a]=[a,i]}return i[r.length]}var r=class extends HTMLElement{instance=null;term=``;fuzzyKeywords=[];connectedCallback(){this.className=`pf-summary`;let t=this.getAttribute(`instance`)||`default`;this.instance=e().getInstance(t),this.fuzzyKeywords=this.dataset.fuzzyKeywords?.split(`.`)??[],this.on(`search`,e=>this.term=e),this.on(`loading`,()=>this.textContent=``),this.on(`results`,this.renderResults.bind(this)),this.on(`error`,this.renderError.bind(this))}on(e,t){this.instance?.on(e,t,this)}renderResults(e){if(!e||!this.term)return;let n=e.results?.length??0,r=t(this.term,this.fuzzyKeywords);this.renderResultCount(n,this.term),r?this.renderSuggestion(r):n===0&&this.renderNoResultsTips()}renderError(){this.innerHTML=`
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
    `}searchTerm(e){let t=document.querySelector(`input.pf-input`);t&&(t.value=e,t.focus(),t.dispatchEvent(new Event(`input`,{bubbles:!0})))}escapeHtml(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}};customElements.get(`search-modal-summary`)||customElements.define(`search-modal-summary`,r);