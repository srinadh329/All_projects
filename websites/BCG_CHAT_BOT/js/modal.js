 
 $(function(){
$('.li-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.include-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal1').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Prediction-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal2').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Text-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal3').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Security-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal4').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Privacy-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal5').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Gui-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal6').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Vat-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal7').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Compatibilities-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal8').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Hosting-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal9').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Analytical-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal10').modal('show').find('.modal-content').load($(this).attr('href'));
    });
$('.Language-modal').on('click', function(e){
      e.preventDefault();
      $('#theModal11').modal('show').find('.modal-content').load($(this).attr('href'));
    });


 });