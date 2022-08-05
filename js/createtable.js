function CreateTable(table_data, tutor_data, table_html) {
  let students = table_data.length - 2;
  let tutors = tutor_data.length;
  let assignment_tutor = Math.floor(students / tutors);
  for (let tutor = 0; tutor < tutors; tutor++) {
    $(table_html).append(`
        <div class="row border-bottom text-center">
        <div class="col fs-5 text-sm-start fw-semibold">Tutor ${tutor_data[tutor]}</div>
        <div class="col fw-bold align-self-end">Aluno</div>
        <div class="col-3 fw-bold align-self-end">RA</div>
    </div>
    <div class="row  py-2 text-center">
        <div class="col fw-bold text-end align-self-center">Comece a corrigir em</div>
        <div class="col fw-semibold text-center align-self-center">${
          table_data[1 + tutor * assignment_tutor][1]
        }</div>
        <div class="col-3 fw-semibold text-center align-self-center">${
          table_data[1 + tutor * assignment_tutor][0]
        }</div>
    </div>`);

    if (tutor == tutors - 1) {
      $(table_html).append(`
    <div class="row py-2 text-center border-bottom justify-self-center">
        <div class="col fw-bold text-end justify-self-center">Pare de Corrigir em</div>
        <div class="col fw-semibold text-center align-self-center">${table_data[students][1]}</div>
        <div class="col-3 fw-semibold text-center align-self-center">${table_data[students][0]}</div>
    </div>`);
    } else {
      $(table_html).append(`
    <div class="row py-2 text-center border-bottom justify-self-center">
        <div class="col fw-bold text-end justify-self-center">Pare de Corrigir em</div>
        <div class="col fw-semibold text-center align-self-center">${
          table_data[(tutor + 1) * assignment_tutor][1]
        }</div>
        <div class="col-3 fw-semibold text-center align-self-center">${
          table_data[(tutor + 1) * assignment_tutor][0]
        }</div>
    </div>`);
    }
  }
}

export { CreateTable };
