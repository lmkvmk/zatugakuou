'use strict';

{
  const quiestion = document.getElementById('quiestion');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const num = document.getElementById('score');
  const scorelabel = document.querySelector('#score > p');

  const quizset = [
    {q: '世界で一番高い山は？', c: ['マウナウェア山','エベレスト', 'マクスウェル山']},
    {q: 'イカの心臓は幾つ?', c: ['3つ', '２つ', '１つ']},
    {q: '赤ちゃんが生まれた時の最初に泣き始める音は?', c: ['「ラ」', '「ア」', '「ナ」']},
  ];

  let currentnum = 0;
  let isanswered;
  let score = 0;

  

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
    }    
    return arr;
  }

  function checkanswer(li){
    if (isanswered === true) {
      return;      
    }
    isanswered = true;
    if (li.textContent === quizset[currentnum].c[0]) {
      li.classList.add('correct');
      btn.classList.remove('disabled');
      score++;
    } else {
      li.classList.add('wrong');
    }
  }

  function setQuiz() {
    isanswered = false;
    quiestion.textContent = quizset[currentnum].q;
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    const shufflechoices = shuffle([...quizset[currentnum].c]);
    shufflechoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkanswer(li)
      });
      choices.appendChild(li);
    });
    if (currentnum === quizset.length - 1) {
      btn.textContent = 'SHOW SCORE';
    }
  }

  setQuiz();

    btn.addEventListener('click', () => {   
      if (btn.classList.contains('disabled')) {
        return;
      } 
      btn.classList.add('disabled');

      if (currentnum === quizset.length - 1){
        // console.log(`正解率: ${100 * (score / quizset.length)}%`);
        scorelabel.textContent = `正解率: ${100 * (score / quizset.length)}%`;
        num.classList.remove('hidden');
      } else {
      currentnum++;
      setQuiz();
      }
    });
}
