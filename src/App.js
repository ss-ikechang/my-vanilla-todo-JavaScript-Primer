export class App {
  mount() {
    const formElement = document.getElementById("add-button");
    const inputElement = document.getElementById("add-text");
    formElement.addEventListener("click", (event) => {
      console.log(`入力欄の値: ${inputElement.value}`);
    });
  }
}
