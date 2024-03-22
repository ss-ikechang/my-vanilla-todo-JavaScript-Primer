import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";
import { IncompleteTodoItemView } from "./view/IncompleteTodoItemView.js";
import { IncompleteTodoListView } from "./view/IncompleteTodoListView.js";
import { CompleteTodoListView } from "./view/CompleteTodoListView.js";

export class App {
  // 1. TodoListModelの初期化
  #incompleteTodoListModel = new TodoListModel();
  #completeTodoListModel = new TodoListModel();
  #incompleteTodoListView = new IncompleteTodoListView();
  #completeTodoListView = new CompleteTodoListView();

  // 完了ボタンコールバック関数
  #onCompleteTodo = (props) => {
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
  // onDeleteTodo(props) {
  //   const { id } = props;
  //   this.#incompleteTodoListModel.deleteTodo({
  //     id: id,
  //   });
  // }
  #onDeleteTodo = (props) => {
    const { id } = props;
    this.#incompleteTodoListModel.deleteTodo({
      id: id,
    });
  };

  // 戻るボタンコールバック関数
  #onBackTodo = (props) => {
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

  mount() {
    const formElement = document.getElementById("add-button");
    const inputElement = document.getElementById("add-text");
    const incomlpeteTodoContainerElement =
      document.getElementById("incomplete-list");
    const comlpeteTodoContainerElement =
      document.getElementById("complete-list");

    // const handleComplete = (props) => {
    //   this.onDeleteTodo(props);
    // };
    // const handleComplete = function (props) {
    //   this.onDeleteTodo(props);
    // };

    // 2-1. incompleteTodoListModelの状態が更新されたら表示を更新する
    this.#incompleteTodoListModel.onChange(() => {
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#incompleteTodoListModel.getTodoItems();
      const todoListElement = this.#incompleteTodoListView.createElement(
        todoItems,
        {
          onCompleteTodo: this.#onCompleteTodo,
          onDeleteTodo: this.#onDeleteTodo,

          // onDeleteTodo: (props) => {
          //   this.onDeleteTodo(props);
          // },
          // クラス - JavaScript | MDN
          // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes
          // 静的メソッドやインスタンスメソッドを this の値なしで呼び出した場合、例えばメソッドを変数に割り当ててから呼び出すと、メソッド内部では this の値が undefined になります。
          // この動作は、 "use strict" ディレクティブが存在しない場合でも同じです。 class 本体の中のコードは常に厳格モードで実行されるからです。
          // 【JavaScript】アロー関数式を学ぶついでにthisも復習する話 #JavaScript - Qiita
          // https://qiita.com/mejileben/items/69e5facdb60781927929
          // アロー関数式で宣言された関数は、宣言された時点で、thisを確定（＝束縛）させてしまうのです。

          // onDeleteTodo: handleComplete,
        }
      );

      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, incomlpeteTodoContainerElement);
    });

    // 2-2. completeTodoListModelの状態が更新されたら表示を更新する
    this.#completeTodoListModel.onChange(() => {
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#completeTodoListModel.getTodoItems();
      const todoListElement = this.#completeTodoListView.createElement(
        todoItems,
        {
          onBackTodo: this.#onBackTodo,
        }
      );

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
