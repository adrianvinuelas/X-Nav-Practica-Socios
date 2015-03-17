datosTimeLine="";
datosMyLine="";
datosUpdate="";
var actualizado = false;
jQuery(document).ready(function() {

	$(function() {
		$( "#tabs" ).tabs();
	});

	$('.socios').click(function(){
		console.log("entro a tabsocios");
		var acordeon = $( "#tabs-3" ).accordion( "instance" );
		var mensajes = "";
		var mensajes1 = "Hay 0 mensajes pendientes"
		if(acordeon != undefined){
			if(actualizado){ var mensajes1 = $("#tabs-3").html();}
			$("#tabs-3").accordion("destroy");
			$("#tabs-3").html("");
		}
		$.getJSON("timeline.json",function(data){
			datosTimeLine = data;
			for(i=0; i< datosTimeLine.comentarios.length; i++){
				var Autor = datosTimeLine.comentarios[i].Autor;
				var Titulo = datosTimeLine.comentarios[i].Titulo;
				var Avatar = datosTimeLine.comentarios[i].Avatar;
				var Contenido = datosTimeLine.comentarios[i].Contenido;
				var Fecha = datosTimeLine.comentarios[i].Fecha;
				var img = "<img src="+ Avatar +" style='width: 50px; height: 50px;'>";
				mensajes += "<h3>"+img + " " + Autor + " - " + Titulo + "</h3><div><p>"+Contenido+"<br>"+Fecha+"</p></div> ";

			}
			if(actualizado == false){
				$("#tabs-3").html(mensajes);
				$( "#tabs-3" ).accordion({active: true});
				$.getJSON("update.json",function(data){
					datosUpdate = data;
					if(datosUpdate == ""){
						console.log("entro aqui")
					}else{
						mensajes1 = "Hay "+ datosUpdate.comentarios.length +" mensajes pendientes";
					}
					$("#menpendientes").html(mensajes1);
				});		
			}else{
				$("#tabs-3").html(mensajes1);
				$( "#tabs-3" ).accordion({active: true});
			}
			
		});
	});


	$('.actualizar').click(function(){
		if(!actualizado){
			$.getJSON("update.json",function(data){
				datosUpdate = data;
				var mensajes = $("#tabs-3").html();
				var acordeon = $( "#tabs-3" ).accordion( "instance" );
				if(acordeon != undefined){
					$("#tabs-3").accordion("destroy");
					$("#tabs-3").html("");
				}
				if(datosUpdate == ""){
					$("#menpendientes").html("Hay 0 mensajes pendientes")
				}else{
					for(i=0; i< datosUpdate.comentarios.length; i++){
						var Autor = datosUpdate.comentarios[i].Autor;
						var Titulo = datosUpdate.comentarios[i].Titulo;
						var Avatar = datosUpdate.comentarios[i].Avatar;
						var Contenido = datosUpdate.comentarios[i].Contenido;
						var Fecha = datosUpdate.comentarios[i].Fecha;
						var img = "<img src="+ Avatar +" style='width: 50px; height: 50px;'>";
						mensajes += "<h3>"+img + " " + Autor + " - " + Titulo + "</h3><div><p>"+Contenido+"<br>"+Fecha+"</p></div> ";

					}
				}
				actualizado = true;
				$("#menpendientes").html("")
				$("#tabs-3").html(mensajes);
				$( "#tabs-3" ).accordion({active: true});
			});
		}	
	});


	$('.usuario').click(function(){
		//$("#tabs-1").html("");
		console.log("entro a datosMyLine");
		var acordeon = $( "#tabs-2" ).accordion( "instance" );
		if(acordeon != undefined){
			$("#tabs-2").accordion("destroy");
			$("#tabs-2").html("");
		}
		$.getJSON("myline.json",function(data){
			datosMyLine = data;
			var mensajes = "";
		
			for(i=0; i< datosMyLine.comentarios.length; i++){
				var Autor = datosMyLine.comentarios[i].Autor;
				var Titulo = datosMyLine.comentarios[i].Titulo;
				var Avatar = datosMyLine.comentarios[i].Avatar;
				var Contenido = datosMyLine.comentarios[i].Contenido;
				var Fecha = datosMyLine.comentarios[i].Fecha;
				var img = "<img src="+ Avatar +" style='width: 50px; height: 50px;'>";
				mensajes += "<h3>"+img + " " + Autor + " - " + Titulo + "</h3><div><p>"+Contenido+"<br>"+Fecha+"</p></div> ";
			}
			$("#tabs-2").html(mensajes);
			$( "#tabs-2" ).accordion({active: true});
		});
		
	});
	
});
