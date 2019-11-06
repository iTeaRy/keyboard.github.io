const keyBoard={};
keyBoard.language = "eng";
keyBoard.shiftClick = false;
keyBoard.altClick = false;
keyBoard.capsClick = false;
keyBoard.rus = [
    [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Backspace", "Backspace"]],
    [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["\\", "/"]],
    [["CapsLock", "CapsLock"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["ArrowUp", "ArrowUp"],["Shift", "Shift"]],
    [["Control", "Control"], ["Win", "Win"], ["Alt", "Alt"], ["Space", "Space"], ["Alt", "Alt"], ["ArrowLeft", "ArrowLeft"], ["ArrowDown", "ArrowDown"], ["ArrowRight", "ArrowRight"]]
  ];
keyBoard.eng =[
    [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+",], ["Backspace", "Backspace"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"],  ["\\", "|"]],
    [["CapsLock", "CapsLock"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["ArrowUp", "ArrowUp"], ["Shift", "Shift"]],
    [["Control", "Control"], ["Win", "Win"], ["Alt", "Alt"], ["Space", "Space"], ["Alt", "Alt"], ["ArrowLeft", "ArrowLeft"], ["ArrowDown", "ArrowDown"], ["ArrowRight", "ArrowRight"]]
  ];
  const smart = {
    Backspace: true,
    Tab: true,
    CapsLock: true,
    Shift: true,
    Control: true,
    Win: true,
    Space: true,
    Enter: true,
    Alt: true,
    "ArrowUp": "\u2191",
    "ArrowDown": "\u2193",
    "ArrowLeft": "\u2190",
    "ArrowRight": "\u2192"
  }
document.body.innerHTML = `<textarea value=""></textarea><div class="keyboard"></div>`;
let keyBoardArea = document.querySelector('.keyboard');
function draw (language, smartkey) {
  console.log('language', language);
  console.log('keyBoard', keyBoard);
    let strToDrow = "";
    for (let i = 0; i < keyBoard[language].length; i++) {
        let rows = keyBoard[language][i];
        strToDrow += `<div class="keyboard__row">`;
        for (let r = 0; r < rows.length; r++) {
          let symbol = rows[r][smartkey];

          if (smart[symbol]) {
            if (smart[symbol]==="\u2191"||smart[symbol]==="\u2193"||smart[symbol]==="\u2190"||smart[symbol]==="\u2192") {
               strToDrow += `<div class="keys smart arrows ${symbol.toLowerCase()}" value="${symbol}">${smart[symbol]}</div>`;
             } else {
               strToDrow += `<div class="keys smart  ${symbol.toLowerCase()}" value="${symbol}">${symbol}</div>`;
             }
          } else {
            strToDrow += `<div class="keys simple" value="${symbol}">${symbol}</div>`;
          }
        }
        strToDrow += `</div>`;
    }
      keyBoardArea.innerHTML = strToDrow;
      document.querySelectorAll('.keys').forEach(function (element) {
          element.onclick = writer;
        });
}

function writer () {
  highlight(this);
  if (smart[this.getAttribute('value')]) {
    smartWriter(this.getAttribute('value'));

  } else {
       if ((keyBoard.capsClick && keyBoard.shiftClick) || (!keyBoard.capsClick && !keyBoard.shiftClick)) {
         document.querySelector('textarea').value += this.getAttribute('value').toLowerCase();
       } else {
         document.querySelector('textarea').value += this.getAttribute('value').toUpperCase();
       }
      }
    }
function smartWriter (key) {
  switch(key){
    case "Shift": {
      clickShift();
    }
    break;
    case "CapsLock": {
      clickCapsLock();
    }
    break;
    case 'Space': {
      document.querySelector('textarea').value += ` `;
      document.querySelector(".space").classList.add('keys_click');
      addAnimation(document.querySelector(".space"));
    }
    break;
    case 'Tab': {
      document.querySelector('textarea').value += `    `;
    }
    break;
    case 'Alt': {
      clickAlt();
    }
    break;
    case 'Enter': {
      document.querySelector('textarea').value += `\n `;
    }
    break;
    case 'Backspace': {
      let str = document.querySelector('textarea').value;
      str = str.slice(0,-1);
      document.querySelector('textarea').value = str;
    }
    break;
  }
}

function clickShift () {
  keyBoard.shiftClick = !keyBoard.shiftClick;
  draw(keyBoard.language, keyBoard.shiftClick ? 1 : 0);
  if (keyBoard.shiftClick && keyBoard.capsClick){
    clickCapsLock(true);
  }
  if (!document.querySelector(".simple-up")) {
    document.querySelector(".keyboard").classList.remove('simple-low');
    document.querySelector(".keyboard").classList.add('simple-up');
  } else {
    document.querySelector(".keyboard").classList.remove('simple-up');
    document.querySelector(".keyboard").classList.add('simple-low');
  }
  if (keyBoard.shiftClick) {
    document.querySelectorAll(".shift").forEach (function (element) {
      element.classList.add('smart_click');
      addAnimation(element);
    });
  } else {
    document.querySelectorAll(".shift").forEach (function (element) {
      element.classList.remove('smart_click');
      removeAnimation(element);
    });
  }
  if (keyBoard.altClick && keyBoard.shiftClick) {
    keyBoard.language = reverseLanguage(keyBoard.language);
    draw(keyBoard.language, 0);
  }
  if (keyBoard.shiftClick) setTimeout(() => {
    if (keyBoard.capsClick) {
      document.querySelector(".keyboard").classList.remove('simple-low');
      document.querySelector(".keyboard").classList.add('simple-up');
    } else {
      document.querySelector(".keyboard").classList.remove('simple-up');
      document.querySelector(".keyboard").classList.add('simple-low');
    }
    document.querySelectorAll(".shift").forEach (function (element) {
      element.classList.remove('smart_click');
    });
    keyBoard.shiftClick = false;
  }, 3000);
}

function clickCapsLock (withoutAnimation) {
  if (!withoutAnimation) {
    keyBoard.capsClick = !keyBoard.capsClick;
  }
  if (keyBoard.capsClick) {
    document.querySelector(".keyboard").classList.remove('simple-low');
    document.querySelector(".keyboard").classList.add('simple-up');
    document.querySelector(".capslock").classList.add('smart_click');
    if (!withoutAnimation) {
      addAnimation(document.querySelector(".capslock"));
    }
  }
  if (!keyBoard.capsClick) {
    document.querySelector(".keyboard").classList.remove('simple-up');
    document.querySelector(".keyboard").classList.add('simple-low');
    document.querySelector(".capslock").classList.remove('smart_click');
    removeAnimation(document.querySelector(".capslock"));
  }
}

function addAnimation(element){
  element.classList.add('animation');
}

function removeAnimation(element){
  element.classList.remove('animation');
}

function clickAlt() {
  keyBoard.altClick = !keyBoard.altClick;
  if (keyBoard.altClick) {
    document.querySelectorAll(".alt").forEach (function (element) {
      element.classList.add('smart_click');
      addAnimation(element);
    });
  } else {
    document.querySelectorAll(".alt").forEach (function (element) {
      element.classList.remove('smart_click');
      removeAnimation(element);
    });
  }
  if (keyBoard.altClick && keyBoard.shiftClick) {
    keyBoard.language = reverseLanguage(keyBoard.language);
    draw(keyBoard.language, 0);
  }
   if (keyBoard.altClick) {
     setTimeout(() => clickAlt(), 1000);
   }
}
function reverseLanguage(language) {
  return language === 'eng' ? 'rus' : 'eng';
}
function highlight(key) {
      let selectedKey = key;
      selectedKey.classList.add('keys_click');
      addAnimation(selectedKey);
      setTimeout(() => {
        selectedKey.classList.remove('keys_click');
        removeAnimation(selectedKey);
      }, 100);
}

document.onkeydown  = document.onkeypress  = handle;

function handle(e) {
  document.querySelector("textarea").focus();
  document.querySelector("textarea").onblur = function() {document.querySelector("textarea").focus()};
  let keyFromBoard = e.key;
  let keySymbol = document.querySelector(`[value="${keyFromBoard}"]`)
  if (keySymbol) {
    if (smart[keyFromBoard]) {
      highlight(keySymbol);
      smartWriter(keyFromBoard);
    } else {
      highlight(keySymbol);
    }
  }
}
window.onbeforeunload = function() {
  localStorage.setItem("lang", keyBoard.language);
};

keyBoard.language = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng';
document.body.onload = draw(keyBoard.language, 0);
