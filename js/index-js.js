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
function searchMovie(){
	$('#movie-list').html('');
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
			if(result.Response == "True"){
				let movies =result.Search;
				$.each(movies, function(i,data){
					$('#movie-list').append(`
						<div class="col-md-4">
							<div class="card">
								<img src=`+ data.Poster +` class="card-img-top" alt="...">
								<div class="card-body">
									<h5 class="card-title card-search">`+data.Title+`</h5>
									<h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
									<a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID+`">Full Detail</a>
								</div>
							</div>
						</div>`);
				})
				
			}else{
				$('#movie-list').html(`
					<h1 class="text-center">`+ result.Error +`
					</h1>`)
			}
			$('#search-input').val('');
		}
	});
}

$('#search-button').on('click',function(){
	searchMovie();
});

$('#search-input').on('keyup',function(e){
	if(e.which == 13){
		searchMovie();
	}
})

$('#movie-list').on('click','.see-detail',function(){
	$.ajax({
		url: 'http://omdbapi.com',
		dataType: 'json',
		type: 'get',
		data: {
			'apikey': 'fcc207c6',
			'i' : $(this).data('id')
		},
		success: function(movie){
			if(movie.Response === "True"){
				$('.modal-body').html(`
					<div class="contaioner-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+movie.Poster+`" class="img-fluid">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
									<li class="list-group-item"><h3>`+movie.Title+`</h3></li>
									<li class="list-group-item">Released : `+movie.Released+`</li>
									<li class="list-group-item">Genre : `+movie.Genre+`</li>
									<li class="list-group-item">Director : `+movie.Director+`</li>
									<li class="list-group-item">Actors : `+movie.Actors+`</li>
								</ul>

							</div>
						</div>
					</div>
				`);
			}
		}
	});
});