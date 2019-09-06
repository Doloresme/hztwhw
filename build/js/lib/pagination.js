(function () {
  var Pagination = window.Pagination = function (option) {
    this.page = option.page || 1;
    this.totalItems = option.items || 0;
    this.itemsPerPage = option.itemsPerPage || 10;
    this.$elem = $('<ul class="pagnition">');
    this.fatherNode = $('#pagination');
    this.init();
  };

  Pagination.prototype.init = function () {
    this.draw();
    this.event();
  }; // Pagination.prototype.event = function(){
  //     var self = this;
  //     this.fatherNode.on('click', 'li', function(){
  //         var page = $(this).data('page');
  //         page && self.setPage(page);
  //         self.draw();
  //     });
  // }


  Pagination.prototype.setPage = function (page) {
    var page = Math.min(Math.max(page, 1), this.getTotalPages());

    if (this.page !== page) {
      this.draw();
      this.page = page;
    }
  }, Pagination.prototype.nextPage = function () {
    this.setPage(this.page++);
  }, Pagination.prototype.prevPage = function () {
    this.setPage(this.page--);
  }, Pagination.prototype.getTotalPages = function () {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }, Pagination.prototype.draw = function () {
    var totalPages = this.getTotalPages();
    var pageNumber = this.page;
    var pageStr = '';

    if (totalPages == 0) {
      this.$elem.html('');
      return;
    }

    if (pageNumber > 1) {
      pageStr += '<li data-page="' + (pageNumber - 1) + '"><a href="javascript:;">上一页</a></li>';
    } // 渲染页码dom结构
    // 第一页 与...


    if (pageNumber !== 1 && pageNumber - 3 > 1 && totalPages > 7) {
      pageStr += '<li data-page="1"><a href="javascript:;">1</a></li>';
    }

    if (pageNumber - 3 > 2 && totalPages > 8) {
      pageStr += '<span>...<span>';
    } // 中间页码


    var startP = pageNumber - 3,
        endP = pageNumber + 3;

    if (startP < 1) {
      endP = endP - startP + 1;
    }

    if (endP > totalPages - 1) {
      startP -= endP - totalPages;
    }

    for (; startP <= endP; startP++) {
      if (startP <= totalPages && startP >= 1) {
        if (startP == pageNumber) {
          pageStr += '<li class="active" data-page="' + startP + '"><a href="javascript:;">' + startP + '</a></li>';
        } else {
          pageStr += '<li data-page="' + startP + '"><a href="javascript:;">' + startP + '</a></li>';
        }
      }
    } // 最后一页与...


    if (pageNumber + 3 < totalPages - 1 && totalPages > 8) {
      pageStr += '<span>...<span>';
    }

    if (pageNumber !== totalPages && pageNumber < totalPages - 3 && totalPages > 7) {
      pageStr += '<li data-page="' + totalPages + '"><a href="javascript:;">' + totalPages + '</a></li>';
    }

    if (pageNumber < totalPages) {
      pageStr += '<li data-page="' + (pageNumber + 1) + '"><a href="javascript:;">下一页</a></li>';
    }

    this.$elem.html(pageStr);
    this.fatherNode.html(this.$elem);
  }; // $.fn.extends({
  //     createPage : Pagination
  // });
})();