let student_list = "";
let tutors = "";

$(document).ready(function () {
  $("#submit-file").on("click", function () {
    const content = document.querySelector(".content");
    const [file] = $("input[type=file]").prop("files");
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        let loaded_table = localStorage.getItem("loaded_table");
        if (loaded_table != null) {
          alert(
            `Você já carregou uma tabela! Por favor, Clique no botão'Limpar Arquivo' para carregar uma nova tabela.`
          );
        } else {
          let clean_result = reader.result.replace(
            `<html><body><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>`,
            ""
          );
          $("#brute-data").append(`${clean_result}`);
          const table_data = $("#brute-data tr").removeClass("align");
          student_list = table_drilldown(table_data);
          localStorage.setItem("loaded_table", "true");
          $("html, body").animate(
            {
              scrollTop:
                $("#step-two").offset().top +
                0.5 * $("#step-two").height() -
                0.5 * $(window).height(),
            },
            2000
          );
        }
      },
      false
    );

    if (file) {
      reader.readAsText(file);
    } else {
      alert("Você não carregou nenhum arquivo. Por favor, carregue um arquivo antes de continuar.");
    }
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

  let tutor_list = [];

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
});

$("#next-step-3").on("click", function () {
  create_table(student_list, tutors);
  $("html, body").animate(
    {
      scrollTop:
        $("#step-three").offset().top + 0.5 * $("#step-three").height() - 0.5 * $(window).height(),
    },
    2000
  );
});

function table_drilldown(data) {
  let drilled_data = [[]];
  for (let row = 0; row < data.length; row++) {
    drilled_data.push([]);
    for (let column = 0; column < 2; column++) {
      drilled_data[row].push(data[row].children[column].outerText);
    }
  }
  return drilled_data;
}

function create_table(table_data, tutor_data) {
  let students = table_data.length - 2;
  let tutors = tutor_data.length;

  let assignment_tutor = Math.floor(students / tutors);
  for (let tutor = 0; tutor < tutors; tutor++) {
    console.log(`Tutor: ${tutor_data[tutor]}`);
    console.log(`inicio tarefa ${1 + tutor * assignment_tutor}
     RA: ${table_data[1 + tutor * assignment_tutor][0]},
     Aluno: ${table_data[1 + tutor * assignment_tutor][1]}`);
    if (tutor == tutors - 1) {
      console.log(`corrigir até ${students}
     RA: ${table_data[students][0]},
     Aluno: ${table_data[students][1]}`);
    } else {
      console.log(`corrigir até ${(tutor + 1) * assignment_tutor}
     RA: ${table_data[(tutor + 1) * assignment_tutor][0]},
     Aluno: ${table_data[(tutor + 1) * assignment_tutor][1]}`);
    }
  }
  console.log(table_data[0][0], table_data[0][1]);
}
