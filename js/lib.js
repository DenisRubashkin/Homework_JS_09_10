
$( function() {
  /* 1. Подключаем карусель */
  $('.jcarousel').jcarousel({
    list: '.jcarousel__list',
    items: '.jcarousel__item'
  });

  $('#prev').on('click', function() {
    $('.jcarousel').jcarousel('scroll', '-=1');
  });

  $('#next').on('click', function() {
    $('.jcarousel').jcarousel('scroll', '+=1');
  });

  /* 2. Подключаем стилизированный выпадающий список */
  $('.fancy').fancySelect();

  /* 3. Стилизируем чекбоксы */
  changeChecks('.js-checkbox');

  function createCBStyle(newCheckClass) {
    $(newCheckClass).css({display: 'inline-block',
      background: 'url("img/checkbox.png")',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      height: '17px',
      paddingRight: '5px',
      marginTop: '4px',
      position: 'relative',
      top: '3px',
      width: '17px'});
  };

  function changeCheckStart(checkClass) {
    $(checkClass).css('position', 'absolute').
    css('clip', 'rect(0,0,0,0)').
    before(function() {
      return '<span class="js-cb"></span>';
    });

    createCBStyle('.js-cb');
    $(checkClass+':checked').prev('.js-cb').css('background-position', '0 -17px');
    $(checkClass+':disabled').prev('.js-cb').css({background: 'url("img/checkbox-disabled.png") no-repeat', cursor: 'default'});
  };

  function changeChecks(checkClass) {
    changeCheckStart(checkClass);
    
    $(checkClass).siblings().mousedown(function() {
      var thisCheck = $(this).siblings(checkClass);
      if (!thisCheck.attr('disabled')) {
        if (thisCheck.attr('checked')) {
          if( $(this).hasClass('js-cb')) {
            $(this).css('background-position', '0 0');  
          } else {
            $(this).siblings('.js-cb').css('background-position', '0 0');
          }
          thisCheck.removeAttr('checked');          
        } else {
          if( $(this).hasClass('js-cb')) {
            $(this).css('background-position', '0 -17px');
          } else {
            $(this).siblings('.js-cb').css('background-position', '0 -17px');
          }
          thisCheck.attr('checked', 'checked');
        }
      }
    })

  }

  /* 4. Меню с анмацией.*/  
  /* ЗЫ: шаманить с DOM-ом без JQuery - это ужас-ужас, но так уж требовалось в ДЗ */
  var menuItemElements = document.getElementsByClassName('submenu__item');
  for (var i = 0; i < menuItemElements.length; i++) {
    menuItemElements[i].style.left = '-200px';
  }

  menuItemElements = document.getElementsByClassName('submenu');
  for (var i = 0; i < menuItemElements.length; i++) {
    menuItemElements[i].addEventListener('mouseenter', showMenu);
    menuItemElements[i].addEventListener('mouseleave', hideMenu);
  }
  
  function showMenu(e) {
    var elements = (e.target.tagName.toUpperCase() =='LI' ? e.target : e.target.parentNode).lastElementChild.children;

    var menuBlock = elements[0].parentNode;
    if(menuBlock.style.display != 'block') {
      menuBlock.style.display = 'block';
      
      var timerId = setInterval(function() {
        var styleLeft = parseInt(elements[elements.length - 1].style.left);
        styleLeft = (styleLeft + 20 >= 0) ? 0 : styleLeft + 20;

        for (var i = 0; i < elements.length; i++) {
          elements[i].style.left = styleLeft + 'px';
        }

        if (styleLeft === 0){
          menuBlock.style.overflow = 'visible';
          clearInterval(timerId);
        }
      }, 30);
    }
  }

  function hideMenu(e) {
    var elements = (e.target.tagName.toUpperCase() =='LI' ? e.target : e.target.parentNode).lastElementChild.children;
    elements[0].parentNode.style.display = 'none';
    elements[0].parentNode.style.overflow = 'hidden';
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.left = '-200px';
    }
  }

})


