const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

function evaluateExpression() {
  try {
    const result = eval(expression);
    expression = Number(result.toFixed(10)).toString();
  } catch {
    expression = 'Error';
  }
  updateDisplay();
}

buttons.forEach((btn) => {
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  btn.addEventListener('click', () => {
    if (action === 'clear') {
      expression = '';
    } else if (action === 'backspace') {
      expression = expression.slice(0, -1);
    } else if (action === 'evaluate') {
      evaluateExpression();
      return;
    } else if (value) {
      if (expression === 'Error') expression = '';
      expression += value;
    }

    updateDisplay();
  });
});

document.addEventListener('keydown', (e) => {
  if (/[0-9+\-*/.%]/.test(e.key)) {
    if (expression === 'Error') expression = '';
    expression += e.key;
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (e.key === 'Enter') {
    evaluateExpression();
    return;
  } else if (e.key === 'Escape') {
    expression = '';
  }

  updateDisplay();
});

updateDisplay();
