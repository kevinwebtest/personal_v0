// //Event ketika link di click
// $('.page-scroll').on('click', function(e){
// 	//Mengambil isi href
// 	var tujuan=$(this).attr('href');
// 	//Menangkap elemen ybs
// 	var elemenTujuan=$(tujuan);
// 	//Terjadi animasi scroll
// 	$('body').animate({
// 		scrollTop: elemenTujuan.offset().top-50
// 	}, 1000);
// 	//Supaya href normal tidak dilakukan
// 	e.preventDefault();
// });

$('#search-button').on('click',function(){
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'fcc207c6',
			's': $('#search-input').val()
		},
		success: function(result){
			console.log(result);
			$('#movie-list').empty();
			if(result.Response == "True"){
				let movies =result.Search;
				$.each(movies, function(i,data){
					$('#movie-list').append(`
					<div class = "container">
					<div class = "row">
						<div class="col-md-4">
							<div class="card mb-3">
								<img src=`+ data.Poster +` class="card-img-top" alt="...">
								<div class="card-body">
									<h5 class="card-title">`+data.Title+`</h5>
									<h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
									<a href="#" class="card-link">Full Detail</a>
								</div>
							</div>
						</div>
					</div>
					</div>`);
				})
				$('#search-input').val('');
			}else{
				$('#movie-list').html(`
					<section id="search">
					<h1 class="text-center">`+ result.Error +`
					</h1></section>`)
			}
		}
	});
});