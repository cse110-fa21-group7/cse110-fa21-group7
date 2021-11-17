window.addEventListener("DOMContentLoaded", init);

function init() {
  const tabSelected = document.querySelector(".tab-a.inactive-a");
  const otherTab = document.querySelector(".tab-a.active-a");

  tabSelected.addEventListener("click", (event) => {
    tabSelected.classList.add("active-a");
    tabSelected.classList.remove("inactive-a");

    otherTab.classList.remove("active-a");
    otherTab.classList.add("inactive-a");

    const tabPicker = tabSelected.getAttribute("data-id");
    console.log(tabPicker);
  });
  //   $(".tab-a").click(function () {
  //     $(".tab").removeClass("tab-active");
  //     $(".tab[data-id='" + $(this).attr("data-id") + "']").addClass("tab-active");
  //     $(".tab-a").removeClass("active-a");
  //     $(this).parent().find(".tab-a").addClass("active-a");
  //   });
}
