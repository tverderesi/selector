import { NextStep } from "./js/animation.js";
import { CreateTable } from "./js/createtable.js";
import { TableDrilldown } from "./js/tabledrilldown.js";

// Declaring Global Variables
let tutors = "";
let tutor_list = [];
let student_list = "";

// Step One
$(document).ready(function () {
  $("#submit-file").on("click", function () {
    // Getting the files
    const [file] = $("#upload-input").prop("files");

    //Instantiating a new FileReader Obj
    const reader = new FileReader();

    //Storing the important data from 'Lista de Alunos.xls'
    reader.addEventListener(
      "load",
      () => {
        //Checking if there are any pre-processed tables in memory
        let loaded_table = localStorage.getItem("loaded_table");
        if (loaded_table != null) {
          alert(
            `Você já carregou uma tabela! Por favor, Clique no botão'Limpar Arquivo' para carregar uma nova tabela.`
          );
        } else {
          //Saving the table to the html file
          $("#brute-data").append(
            reader.result.replace(
              `<html><body><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>`,
              ""
            )
          );

          //Getting Student RA and Name into an Array
          student_list = TableDrilldown($("#brute-data tr").removeClass("align"));

          //Telling there is a processed table into memory. There are conflicts because of the
          //.append method used earlier.

          localStorage.setItem("loaded_table", "true");

          NextStep("#step-two");
        }
      },
      false
    );

    //Foolproofing for those who forgot to upload a table.

    if (file) {
      reader.readAsText(file);
    } else {
      alert("Você não carregou nenhum arquivo. Por favor, carregue um arquivo antes de continuar.");
    }
  });
});

$("#show-table").on("click", function () {
  $("#brute-data").toggleClass("d-none");
  let btn_text = $("#show-table").text();
  if (~btn_text.indexOf("Visualizar")) {
    $("#show-table").text("Esconder tabela");
  }
  if (~btn_text.indexOf("Esconder")) {
    $("#show-table").text("Visualizar Tabela");
  }
});

$("#clear-file").on("click", function () {
  $("#upload-input").val("");
  localStorage.removeItem("loaded_table");
  $("#brute-data").children().remove();
});

$("#insert-tutor").on("click", function () {
  let tutor = $("#tutor-name").val();
  if (tutor == "") {
    alert("Você precisa inserir um nome!");
  } else {
    let tutor_id = +$("#tutor-table tr:last td:first").html() || 0;
    tutor_id++;
    tutor_list.push(tutor);
    tutors = tutor_list;

    $("#tutor-table").append(`<tr class="font-weight-bold">
<td scope="row">${tutor_id}</td>
<td>${tutor}</td>
</tr>`);
    $("#tutor-name").val("");
  }
});
$("#remove-tutor").on("click", function () {
  let number_rows = $("#tutor-table tbody td").length;
  if (number_rows == 0) {
    alert("A tabela está vazia!");
  } else {
    $("#tutor-table tr:last").remove();
    tutor_list.pop();
  }
});

$("#next-step-3").on("click", function () {
  CreateTable(student_list, tutors, "#assignment");
  NextStep("#step-three");
});
