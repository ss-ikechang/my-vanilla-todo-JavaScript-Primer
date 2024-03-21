import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  // 1. TodoListModelの初期化
  #incompleteTodoListModel = new TodoListModel();
  #completeTodoListModel = new TodoListModel();

  mount() {
    const formElement = document.getElementById("add-button");
    const inputElement = document.getElementById("add-text");
    const incomlpeteTodoContainerElement =
      document.getElementById("incomplete-list");
    const comlpeteTodoContainerElement =
      document.getElementById("complete-list");

    // 完了ボタンコールバック関数
    const onCompleteTodo = (props) => {
      const { id, title } = props;
      // 指定したTodoアイテムを完了にする→incompleteTodoListModelから削除し、completeTodoListModelに追加
      this.#incompleteTodoListModel.deleteTodo({
        id: id,
      });
      this.#completeTodoListModel.addTodo(
        new TodoItemModel({
          title: title,
          completed: true,
        })
      );
    };

    // 削除ボタンコールバック関数
    const onDeleteTodo = (props) => {
      const { id } = props;
      this.#incompleteTodoListModel.deleteTodo({
        id: id,
      });
    };

    // 戻るボタンコールバック関数
    const onBackTodo = (props) => {
      const { id, title } = props;
      // 指定したTodoアイテムを未完了にする→completeTodoListModelから削除し、incompleteTodoListModelに追加
      this.#completeTodoListModel.deleteTodo({
        id: id,
      });
      this.#incompleteTodoListModel.addTodo(
        new TodoItemModel({
          title: title,
          completed: false,
        })
      );
    };

    // 2-1. incompleteTodoListModelの状態が更新されたら表示を更新する
    this.#incompleteTodoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul></ul>`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#incompleteTodoListModel.getTodoItems();
      todoItems.forEach((item) => {
        // 未完了だけ表示する
        if (item.completed === false) {
          const todoItemElement = element`<li><div class="list-row"><p class="todo-item">${item.title}</p><button class="complete-button">完了</button><button class="delete-button">削除</button></div></li>`;

          // 完了ボタンがクリックされたときのイベントにリスナー関数を登録
          const completeButtonElement =
            todoItemElement.querySelector(".complete-button");
          completeButtonElement.addEventListener("click", () => {
            onCompleteTodo({ id: item.id, title: item.title });
          });

          // 削除ボタンがクリックされたときにincompleteTodoListModelからアイテムを削除する
          const deleteButtonElement =
            todoItemElement.querySelector(".delete-button");
          deleteButtonElement.addEventListener("click", () => {
            onDeleteTodo({ id: item.id });
          });

          todoListElement.appendChild(todoItemElement);
        }
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, incomlpeteTodoContainerElement);
    });

    // 2-2. completeTodoListModelの状態が更新されたら表示を更新する
    this.#completeTodoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul></ul>`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#completeTodoListModel.getTodoItems();
      todoItems.forEach((item) => {
        // 完了だけ表示する
        if (item.completed === true) {
          const todoItemElement = element`<li><div class="list-row"><p class="todo-item">${item.title}</p><button class="back-button">戻る</button></div></li>`;

          // 戻るボタンがクリックされたときのイベントにリスナー関数を登録
          const backButtonElement =
            todoItemElement.querySelector(".back-button");
          backButtonElement.addEventListener("click", () => {
            onBackTodo({ id: item.id, title: item.title });
          });

          todoListElement.appendChild(todoItemElement);
        }
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, comlpeteTodoContainerElement);
    });

    formElement.addEventListener("click", (event) => {
      console.log(`入力欄の値: ${inputElement.value}`);
      // 新しいTodoItemをTodoListへ追加する
      this.#incompleteTodoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
    });
  }
}
