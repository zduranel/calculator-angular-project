import { Component } from '@angular/core';

import { getItemFromLS, saveItemToLS } from "src/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  input: string = '';
  result: string = '';
  hiddenClassName: string = '-hidden';
  activeClassName: string = "active";
  historyCalculations: string[] = [];

  historyCalculationsLSName: string = "history-calculations";

  constructor() {
    this.initEvets();
    this.getHistoryCalculations();
  }

  initEvets() {
    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "1":

          break;
        case "2":

          break;
        case "3":

          break;
        case "4":

          break;
        case "5":

          break;
        case "6":

          break;
        case "7":

          break;
        case "8":

          break;
        case "9":

          break;

        default:
          break;
      }
    }, false);
  }

  getHistoryCalculations() {
    const historyCalculations = getItemFromLS(this.historyCalculationsLSName)

    if (historyCalculations) this.historyCalculations = historyCalculations;
  }

  pressNum(num: string) {


    if (num == ".") {
      if (this.input != "") {

        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }




    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+' || PrevKey === '%') {
        return;
      }
    }

    this.input = this.input + num
    this.calcAnswer();
  }


  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    if (this.input.toString().lastIndexOf("%") > pos) pos = this.input.lastIndexOf("%")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }


  pressOperator(op: string) {


    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '%') {
      return;
    }

    this.input = this.input + op
    this.calcAnswer();
  }


  clear() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    if (formula === '') return;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.' || lastKey === '%') {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log("Formula " + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    console.log(this.input, this.result);
    this.calcAnswer();
    if (this.input.toString() !== this.result.toString()) {

      if (this.historyCalculations.length > 2) {
        this.historyCalculations.shift();
      }

      this.historyCalculations.push(`${this.input} = ${this.result}`);
      saveItemToLS(this.historyCalculationsLSName, this.historyCalculations)
    }

    this.input = this.result;

    if (this.input == "0") this.input = "";
  }

  handleModBtnClick(e: any) {
    const htmlElement = document.querySelector("html");
    const calculaterElement = document.querySelector(".js-calculater");
    const modButtonElements: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.js-mod-btn');

    const modType = e.currentTarget?.dataset.type;

    modButtonElements.forEach((btn: HTMLButtonElement) => {
      btn.classList.remove(this.activeClassName)
    })

    e.currentTarget.classList.add(this.activeClassName);

    htmlElement?.setAttribute("data-type", modType);
    calculaterElement?.setAttribute("data-type", modType);
  }

  handleHistoryBtnClick() {
    const calculaterHistoryElement: HTMLDivElement | null = document.querySelector('.js-calculater-history');

    calculaterHistoryElement?.classList.toggle(this.hiddenClassName);
  }
}
