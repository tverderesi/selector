function NextStep(step) {
  $("html, body").animate(
    {
      scrollTop: $(step).offset().top + 0.5 * $(step).height() - 0.5 * $(window).height(),
    },
    2000
  );
}

export { NextStep };
