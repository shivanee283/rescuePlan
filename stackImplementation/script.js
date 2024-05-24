// script.js
class Stack {
    constructor() {
      this.elements = [];
    }
  
    push(element) {
      this.elements.push(element);
      this.updateUI();
    }
  
    pop() {
      if (this.elements.length === 0) return null;
      const poppedElement = this.elements.pop();
      this.updateUI();
      return poppedElement;
    }
  
    updateUI() {
        const stackDiv = document.getElementById('stack');
        // The elements are mapped in reverse order so the last pushed appears on top
        stackDiv.innerHTML = this.elements.slice().reverse().map(element => `<div class="stack-element">${element}</div>`).join('');
      }
      // Add this inside the Stack class in script.js

popAnimation(callback) {
    const stackDiv = document.getElementById('stack');
    if (stackDiv.firstChild) {
      stackDiv.firstChild.classList.add('pop');
      stackDiv.firstChild.addEventListener('animationend', () => {
        callback();
        this.updateUI();
      }, { once: true });
    }
  }
  
  // Update the pop method in the Stack class
  pop() {
    if (this.elements.length === 0) return null;
    this.popAnimation(() => {
      const poppedElement = this.elements.pop();
      return poppedElement;
    });
  }
  
  
  }
  
  const stack = new Stack();
  const pushBtn = document.getElementById('push-btn');
  const popBtn = document.getElementById('pop-btn');
  
  pushBtn.addEventListener('click', () => {
    const newElement = prompt('Enter the element to push:');
    if (newElement) {
      stack.push(newElement);
    }
  });
  
  // Update the pop button event listener
  popBtn.addEventListener('click', () => {
    if (stack.elements.length > 0) {
      stack.pop();
    } else {
      alert('The stack is empty.');
    }
  });
