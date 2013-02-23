function uploadPhoto( _source, _callback) {
  
	var onSuccess = function(e){
		if(e.media){
			Cloud.Photos.create({
			    photo: e.media
			}, function (e) {
			    if (e.success) {
			        var photo = e.photos[0];
			        alert('Success:\\n' +
			            'id: ' + photo.id + '\\n' +
			            'filename: ' + photo.filename + '\\n' +
			            'size: ' + photo.size,
			            'updated_at: ' + photo.updated_at);
			    } else {
			        alert('Error:\\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			    _callback && _callback(e);
			});
		}
	}
	
	switch(_source){
		case "CAMERA":
			Ti.Media.showCamera({
				animated: true,
				allowEditing: true,
				autohide: true,
				mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
				success: onSuccess,
				error: function(e){ alert('Error:\\n' +
			            ((e.error && e.message) || JSON.stringify(e)));}
			});
			break;
		case "GALLERY":
			Ti.Media.openPhotoGallery({
				animated: true,
				allowEditing: true,
				autohide: true,
				mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
				success: onSuccess,
				error: function(e){ alert('Error:\\n' +
			            ((e.error && e.message) || JSON.stringify(e)));}
			});
			break;
		default:
	}
}
