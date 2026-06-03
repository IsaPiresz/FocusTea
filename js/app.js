const estudos = {
  fotossintese: { titulo: '🌱 Fotossíntese', texto: 'A planta usa luz do sol, água e gás carbônico para produzir energia. Pense nela como uma pequena fábrica natural.' },
  matematica: { titulo: '📐 Matemática', texto: 'Resolver uma conta fica mais fácil quando você separa em etapas: entender, montar, calcular e conferir.' },
  historia: { titulo: '🏛️ História', texto: 'História estuda acontecimentos do passado para entender como a sociedade mudou até hoje.' }
};

function tarefas(){ return JSON.parse(localStorage.getItem('focusTeaTarefas')) || [
  {texto:'Estudar Matemática por 20 minutos', feito:false},
  {texto:'Fazer pausa sensorial de 10 minutos', feito:false},
  {texto:'Revisar uma matéria com exemplo visual', feito:false}
];}
function salvarTarefas(lista){ localStorage.setItem('focusTeaTarefas', JSON.stringify(lista)); atualizarTudo(); }
function atualizarTudo(){ renderTarefas(); renderResumo(); atualizarProgresso(); }
function renderTarefas(){ const el=document.getElementById('listaTarefas'); if(!el) return; el.innerHTML=''; tarefas().forEach((t,i)=>{ el.innerHTML += `<div class="task ${t.feito?'done':''}"><label><input type="checkbox" ${t.feito?'checked':''} onchange="alternarTarefa(${i})">${t.texto}</label><button class="btn btn-soft" onclick="removerTarefa(${i})">Remover</button></div>`; }); }
function renderResumo(){ const el=document.getElementById('listaResumo'); if(!el) return; el.innerHTML=''; tarefas().slice(0,4).forEach(t=> el.innerHTML += `<div class="task ${t.feito?'done':''}"><span>${t.feito?'✅':'⬜'} ${t.texto}</span></div>`); }
function atualizarProgresso(){ const lista=tarefas(); const total=lista.length || 1; const feitos=lista.filter(t=>t.feito).length; const pct=Math.round((feitos/total)*100); ['progressoNumero','progressoCard'].forEach(id=>{const el=document.getElementById(id); if(el) el.textContent=pct+'%'}); const barra=document.getElementById('barraProgresso'); if(barra) barra.style.width=pct+'%'; }
function adicionarTarefa(){ const input=document.getElementById('novaTarefa'); if(!input || !input.value.trim()) return; const lista=tarefas(); lista.push({texto:input.value.trim(), feito:false}); input.value=''; salvarTarefas(lista); }
function alternarTarefa(i){ const lista=tarefas(); lista[i].feito=!lista[i].feito; salvarTarefas(lista); }
function removerTarefa(i){ const lista=tarefas(); lista.splice(i,1); salvarTarefas(lista); }
function gerarRotinaIA(){ salvarTarefas([{texto:'Organizar material de estudo',feito:false},{texto:'Estudar uma matéria por 25 minutos',feito:false},{texto:'Fazer pausa de 10 minutos',feito:false},{texto:'Resolver 3 exercícios',feito:false},{texto:'Preparar o próximo dia',feito:false}]); }
function trocarMateria(){ const key=document.getElementById('materia')?.value || 'fotossintese'; const c=estudos[key]; const el=document.getElementById('conteudoEstudo'); if(el) el.innerHTML=`<h2>${c.titulo}</h2><p>${c.texto}</p><button class="btn btn-soft" onclick="explicarOutroJeito()">Explicar de outro jeito</button>`; }
function explicarOutroJeito(){ const el=document.getElementById('conteudoEstudo'); if(el) el.innerHTML += `<div class="ai-answer">🤖 Explicação simples: imagine que o conteúdo é uma sequência de passos. Você aprende um passo, descansa e depois passa para o próximo.</div>`; }
function responderIA(){ const p=document.getElementById('perguntaIA')?.value || ''; const r=document.getElementById('respostaIA'); if(r) r.textContent = p.trim() ? '🤖 Vou explicar de forma simples: vamos dividir sua dúvida em partes pequenas e usar exemplos do dia a dia.' : 'Digite uma pergunta primeiro.'; }
function corrigirExercicio(){ const marcada=document.querySelector('input[name="q1"]:checked'); const fb=document.getElementById('feedbackQuiz'); if(!fb) return; fb.textContent = marcada?.value==='certa' ? '✅ Correto! Ótimo trabalho.' : '💡 Quase! A resposta certa é o processo das plantas produzirem alimento.'; }
function salvarConfiguracoes(){ const config={tema:tema?.value||'padrao', fonte:fonte?.value||'normal', semDistracoes:semDistracoes?.checked||false, reducao:reducao?.checked||false}; localStorage.setItem('focusTeaConfig',JSON.stringify(config)); aplicarConfiguracoes(); const s=document.getElementById('statusConfig'); if(s) s.textContent='Configurações salvas!'; }
function aplicarConfiguracoes(){ const c=JSON.parse(localStorage.getItem('focusTeaConfig')) || {}; document.body.classList.remove('theme-calmo','theme-foco','theme-escuro','theme-alto','font-grande','font-muito','sem-distracoes','reducao'); if(c.tema && c.tema!=='padrao') document.body.classList.add('theme-'+c.tema); if(c.fonte && c.fonte!=='normal') document.body.classList.add('font-'+c.fonte); if(c.semDistracoes) document.body.classList.add('sem-distracoes'); if(c.reducao) document.body.classList.add('reducao'); ['tema','fonte','semDistracoes','reducao'].forEach(id=>{const el=document.getElementById(id); if(el && c[id]!==undefined) el.type==='checkbox'?el.checked=c[id]:el.value=c[id];}); }
document.addEventListener('DOMContentLoaded',()=>{ aplicarConfiguracoes(); atualizarTudo(); trocarMateria(); });
