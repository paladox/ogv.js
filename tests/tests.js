QUnit.test( "OGVPlayer loaded", function( assert ) {
	assert.ok( window.OGVPlayer !== undefined, "Passed!" );
});

function nativePlayer() {
	return document.createElement('video');
}

function ogvPlayer() {
	return new OGVPlayer();
}

QUnit.assert.floatClose = function(actual, expected, message) {
	var delta = 1 / 64,
		ok = Math.abs(actual - expected) < delta;
	this.push(ok, actual, expected, message);
};

var hasNativeOgg = (function() {
	var video = document.createElement('video');
	return video.canPlayType('video/ogg; codecs="theora,vorbis"') &&
	       video.canPlayType('video/ogg; codecs="theora,opus"');
})();

function doubleTest(description, func) {
	if (hasNativeOgg) {
		QUnit.test("native video: " + description, function( assert ) {
			var player = nativePlayer();
			document.getElementById('qunit-fixture').appendChild(player);
			func(assert, player);
		} );
	}

	QUnit.test("OGVPlayer: " + description, function( assert ) {
		var player = ogvPlayer();
		document.getElementById('qunit-fixture').appendChild(player);
		func(assert, player);
	} );
}

function doubleAsyncTest(description, func) {
	if (hasNativeOgg) {
		QUnit.asyncTest("native video: " + description, function( assert ) {
			var player = nativePlayer();
			document.getElementById('qunit-fixture').appendChild(player);
			func(assert, player);
		} );
	}

	QUnit.asyncTest("OGVPlayer: " + description, function( assert ) {
		var player = ogvPlayer();
		document.getElementById('qunit-fixture').appendChild(player);
		func(assert, player);
	} );
}

QUnit.test("OGVCompat", function(assert) {
	assert.ok(OGVCompat.supported('OGVDecoder'), 'current browser supports OGVDecoder');
	assert.ok(OGVCompat.supported('OGVPlayer'), 'current browser supports OGVPlayer');

	// some sample UAs from semirandom google searches
	assert.ok(OGVCompat.isBlacklisted('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'), 'iPhone 6 safari blacklisted');
	assert.ok(OGVCompat.isBlacklisted('Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'), 'iPhone 6 safari blacklisted');
	assert.ok(OGVCompat.isBlacklisted('Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25'), 'iPhone 6.1 safari blacklisted');
	assert.ok(OGVCompat.isBlacklisted('Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'), 'iPad 7 safari blacklisted');
	assert.ok(OGVCompat.isBlacklisted('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/536.29.13 (KHTML, like Gecko) Version/6.0.4 Safari/536.29.13'), 'Mac Safari 6 blacklisted');

	assert.ok(!OGVCompat.isBlacklisted('Mozilla/5.0 (iPad; CPU OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4'), 'iPad 8 safari not blacklisted');
	assert.ok(!OGVCompat.isBlacklisted('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'), 'Mac Safari 7 not blacklisted');
});

doubleTest("instantiates", function(assert, player) {
	assert.equal(typeof player, 'object');
});

doubleTest("object has expected properties", function(assert, player) {
	// Core properties
	assert.equal(typeof player.autoplay, 'boolean', 'autoplay');
	assert.equal(typeof player.buffered, 'object', 'buffered');
	assert.equal(typeof player.controls, 'boolean', 'controls');
	assert.strictEqual(player.crossOrigin, null, 'crossOrigin'); // string but defaults to null/empty
	assert.equal(typeof player.currentSrc, 'string', 'currentSrc');
	assert.equal(typeof player.currentTime, 'number', 'currentTime');
	assert.equal(typeof player.defaultMuted, 'boolean', 'defaultMuted');
	assert.equal(typeof player.defaultPlaybackRate, 'number', 'defaultPlaybackRate');
	assert.equal(typeof player.duration, 'number', 'duration');
	assert.equal(typeof player.paused, 'boolean', 'paused');
	assert.equal(typeof player.ended, 'boolean', 'ended');
	assert.strictEqual(player.error, null, 'error'); // string but defaults to null/empty
	assert.equal(typeof player.loop, 'boolean', 'loop');
	assert.equal(player.mediaGroup, null, 'mediaGroup'); // string but defaults to null/empty
	assert.equal(typeof player.muted, 'boolean', 'muted');
	assert.equal(typeof player.networkState, 'number', 'networkState');
	assert.equal(typeof player.playbackRate, 'number', 'playbackRate');
	assert.equal(typeof player.played, 'object', 'played'); // ??
	assert.equal(typeof player.poster, 'string', 'poster');
	assert.equal(typeof player.readyState, 'number', 'readyState');
	assert.equal(typeof player.seeking, 'boolean', 'seeking');
	assert.equal(typeof player.src, 'string', 'src');
	assert.equal(typeof player.videoWidth, 'number', 'videoWidth');
	assert.equal(typeof player.videoHeight, 'number', 'videoHeight');
	assert.equal(typeof player.volume, 'number', 'volume');
	assert.equal(typeof player.width, 'number', 'width');
	assert.equal(typeof player.height, 'number', 'height');

	assert.equal(typeof player.canPlayType, 'function', 'canPlayType');
	//assert.equal(typeof player.fastSeek, 'function', 'fastSeek'); // missing on native in Chromium as of 49
	assert.equal(typeof player.load, 'function', 'load');
	assert.equal(typeof player.play, 'function', 'play');
	assert.equal(typeof player.pause, 'function', 'pause');

	assert.equal(player.onloadstart, null, 'onloadstart');
	assert.equal(player.onprogress, null, 'onprogress');
	assert.equal(player.onsuspend, null, 'onsuspend');
	assert.equal(player.onabort, null, 'onabort');
	assert.equal(player.onemptied, null, 'onemptied');
	assert.equal(player.onstalled, null, 'onstalled');

	assert.equal(player.onloadedmetadata, null, 'onloadedmetadata');
	assert.equal(player.onloadeddata, null, 'onloadeddata');
	assert.equal(player.oncanplay, null, 'oncanplay');
	assert.equal(player.oncanplaythrough, null, 'oncanplaythrough');
	assert.equal(player.onplaying, null, 'onplaying');
	assert.equal(player.onwaiting, null, 'onwaiting');
	assert.equal(player.onseeking, null, 'onseeking');
	assert.equal(player.onseeked, null, 'onseeked');
	assert.equal(player.onended, null, 'onended');
	assert.equal(player.ondurationchange, null, 'ondurationchange');
	assert.equal(player.ontimeupdate, null, 'ontimeupdate');
	assert.equal(player.onplay, null, 'onplay');
	assert.equal(player.onpause, null, 'onpause');
	assert.equal(player.onratechange, null, 'onratechange');
	assert.equal(player.onresize, null, 'onresize');
	assert.equal(player.onvolumechange, null, 'onvolumechange');

	assert.equal(player.NETWORK_EMPTY, 0, 'NETWORK_EMPTY');
	assert.equal(player.NETWORK_IDLE, 1, 'NETWORK_IDLE');
	assert.equal(player.NETWORK_LOADING, 2, 'NETWORK_LOADING');
	assert.equal(player.NETWORK_NO_SOURCE, 3, 'NETWORK_NO_SOURCE');

	assert.equal(player.HAVE_NOTHING, 0, 'HAVE_NOTHING');
	assert.equal(player.HAVE_METADATA, 1, 'HAVE_METADATA');
	assert.equal(player.HAVE_CURRENT_DATA, 2, 'HAVE_CURRENT_DATA');
	assert.equal(player.HAVE_FUTURE_DATA, 3, 'HAVE_FUTURE_DATA');
	assert.equal(player.HAVE_ENOUGH_DATA, 4, 'HAVE_ENOUGH_DATA');

	// MSE-ish stuff, not yet implemented
	//assert.equal(typeof player.audioTracks, 'object', 'audioTracks');
	//assert.equal(typeof player.textTracks, 'object', 'textTracks');
	//assert.equal(typeof player.videoTracks, 'object', 'videoTracks');
	//assert.equal(typeof player.srcObject, 'object', 'srcObject');
	//assert.equal(typeof player.addTextTrack, 'function', 'addTextTrack');

	// In spec but also not implemented consistently, so don't support
	//assert.equal(typeof player.disableRemotePlayback, 'boolean', 'disableRemotePlayback'); // ??

});

QUnit.test('MediaType', function(assert) {
	var sets = [
		{
			contentType: 'application/ogg',
			major: 'application',
			minor: 'ogg',
			codecs: null
		},
		{
			contentType: 'audio/ogg; codecs="vorbis"',
			major: 'audio',
			minor: 'ogg',
			codecs: ['vorbis']
		},
		{
			contentType: 'audio/ogg;codecs =" vorbis"',
			major: 'audio',
			minor: 'ogg',
			codecs: ['vorbis']
		},
		{
			contentType: 'video/ogg; codecs="theora,vorbis"',
			major: 'video',
			minor: 'ogg',
			codecs: ['theora', 'vorbis']
		},
		{
			contentType: 'video/webm; codecs=" vp9 , opus "',
			major: 'video',
			minor: 'webm',
			codecs: ['vp9', 'opus']
		},
	];
	sets.forEach(function(input) {
		var type = new OGVMediaType(input.contentType);
		assert.equal(type.major, input.major, 'type.major: ' + input.contentType);
		assert.equal(type.minor, input.minor, 'type.minor: ' + input.contentType);
		assert.deepEqual(type.codecs, input.codecs, 'type.codecs: ' + input.contentType);
	});
});
doubleTest('canPlayType', function(assert, player) {
	assert.equal(player.canPlayType('audio/ogg'), 'maybe', 'audio/ogg');
	assert.equal(player.canPlayType('audio/ogg; codecs="vorbis"'), 'probably', 'audio/ogg; codecs="vorbis"');
	assert.equal(player.canPlayType('audio/ogg; codecs="opus"'), 'probably', 'audio/ogg; codecs="opus"');

	assert.equal(player.canPlayType('video/ogg'), 'maybe', 'video/ogg');
	assert.equal(player.canPlayType('video/ogg; codecs="theora"'), 'probably', 'video/ogg; codecs="theora"');
	assert.equal(player.canPlayType('video/ogg; codecs="theora,vorbis"'), 'probably', 'video/ogg; codecs="theora,vorbis"');
	assert.equal(player.canPlayType('video/ogg; codecs="theora,opus"'), 'probably', 'video/ogg; codecs="theora,opus"');
});

doubleTest('canPlayTypeSpaces', function(assert, player) {
	assert.equal(player.canPlayType('audio/ogg;codecs="vorbis"'), 'probably', 'audio/ogg;codecs="vorbis"');
	assert.equal(player.canPlayType('audio/ogg; codecs="opus "'), 'probably', 'audio/ogg; codecs="opus "');
	assert.equal(player.canPlayType('audio/ogg; codecs=" opus"'), 'probably', 'audio/ogg; codecs=" opus"');

	assert.equal(player.canPlayType('video/ogg'), 'maybe', 'video/ogg');
	assert.equal(player.canPlayType('video/ogg; codecs="theora"'), 'probably', 'video/ogg; codecs="theora"');
	assert.equal(player.canPlayType('video/ogg; codecs="theora, vorbis"'), 'probably', 'video/ogg; codecs="theora, vorbis"');
	assert.equal(player.canPlayType('video/ogg; codecs="vorbis,theora"'), 'probably', 'video/ogg; codecs="theora,vorbis"');
	assert.equal(player.canPlayType('video/ogg; codecs="theora ,opus"'), 'probably', 'video/ogg; codecs="theora ,opus"');
});


doubleAsyncTest('load yields onloadedmetadata', function(assert, player) {
	assert.ok( player.paused, 'player thinks it is paused before load');
	player.src = 'media/320x240.ogv';
	player.onloadedmetadata = function() {
		assert.ok( true, 'onloadedmetadata was fired' );
		assert.ok( player.paused, 'player still thinks it is paused');
		// todo: assert.equal(Math.round(player.duration), 4); // more or less
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('metadata detects size', function(assert, player) {
	player.src = 'media/320x240.ogv';
	assert.equal(player.videoWidth, 0, "don't know width before");
	assert.equal(player.videoHeight, 0, "don't know height before");
	player.onloadedmetadata = function() {
		assert.equal(player.videoWidth, 320, "videoWidth");
		assert.equal(player.videoHeight, 240, "videoHeight");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('metadata detects aspect ratio', function(assert, player) {
	player.src = 'media/aspect.ogv';
	assert.equal(player.videoWidth, 0, "don't know width before");
	assert.equal(player.videoHeight, 0, "don't know height before");
	player.onloadedmetadata = function() {
		assert.equal(player.videoWidth, 525, "videoWidth is 525 not 352");
		assert.equal(player.videoHeight, 288, "videoHeight is 288");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('metadata detects duration for file with x-content-duration', function(assert, player) {
	player.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3c/IP-Routing.webm/IP-Routing.webm.360p.ogv';
	assert.ok(isNaN(player.duration), "don't know duration before");
	player.onloadedmetadata = function() {
		assert.floatClose(player.duration, 330.284, "duration");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('metadata detects duration for file with skeleton', function(assert, player) {
	player.src = 'media/3seconds.ogv';
	assert.ok(isNaN(player.duration), "don't know duration before");
	player.onloadedmetadata = function() {
		assert.equal(player.duration, 3, "duration");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('metadata detects duration for file without skeleton', function(assert, player) {
	player.src = 'media/3seconds-noskeleton.ogv';
	assert.ok(isNaN(player.duration), "don't know duration before");
	player.onloadedmetadata = function() {
		assert.equal(player.duration, 3, "duration");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('resize detects size', function(assert, player) {
	player.src = 'media/320x240.ogv';
	assert.equal(player.videoWidth, 0, "don't know width before");
	assert.equal(player.videoHeight, 0, "don't know height before");
	player.onresize = function() {
		assert.equal(player.videoWidth, 320, "videoWidth");
		assert.equal(player.videoHeight, 240, "videoHeight");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('durationchange detects duration for file with skeleton', function(assert, player) {
	player.src = 'media/3seconds.ogv';
	assert.ok(isNaN(player.duration), "don't know duration before");
	player.ondurationchange = function() {
		assert.equal(player.duration, 3, "duration");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('seekable matches duration', function(assert, player) {
	player.src = 'media/3seconds.ogv';
	var seekable = player.seekable;
	assert.equal(seekable.length, 0, "zero ranges in seekable pre-load");
	player.onloadedmetadata = function() {
		var seekable = player.seekable;
		assert.equal(seekable.length, 1, "one range in seekable");
		assert.equal(seekable.start(0), 0, "seekable range starts at 0");
		assert.floatClose(seekable.end(0), player.duration, "seekable range matches duration");
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('addEventListener for loadedmetadata', function(assert, player) {
	player.src = 'media/320x240.ogv';
	player.addEventListener('loadedmetadata', function() {
		assert.ok( true, 'onloadedmetadata was fired' );
		QUnit.start();
	});
	player.load();
});

doubleAsyncTest('play yields onloadedmetadata', function(assert, player) {
	assert.ok( player.paused, 'player thinks it is paused before play');
	player.src = 'media/3seconds.ogv';
	player.onloadedmetadata = function() {
		assert.ok( true, 'onloadedmetadata was fired' );
		assert.ok( !player.paused, 'player no longer thinks it is paused (2)');
		player.pause();
		QUnit.start();
	};
	player.play();
	assert.ok( !player.paused, 'player no longer thinks it is paused (1)');
});

doubleAsyncTest('play yields onplay', function(assert, player) {
	player.src = 'media/1second.ogv';
	player.onplay = function() {
		assert.ok( true, 'onplay event was fired' );
		assert.ok( !player.paused, 'player thinks it is playing');
		player.pause();
		QUnit.start();
	};
	player.play();
});

doubleAsyncTest('play yields onended', function(assert, player) {
	player.src = 'media/1second.ogv';
	player.onended = function() {
		assert.ok( true, 'onended event was fired' );
		assert.ok( player.paused, 'player thinks it is paused again');
		QUnit.start();
	};
	player.play();
});

doubleAsyncTest('play yields timeupdate', function(assert, player) {
	player.src = 'media/1second.ogv';
	player.ontimeupdate = function() {
		assert.ok( true, 'ontimeupdate event was fired once' );
		player.ontimeupdate = function() {
			assert.ok( true, 'ontimeupdate event was fired twice' );
			player.ontimeupdate = null;
			player.pause();
			QUnit.start();
		};
	};
	player.play();
});

doubleAsyncTest('readyState distinguishes nothing from something', function(assert, player) {
	player.src = 'media/1second.ogv';
	assert.ok( player.readyState == player.HAVE_NOTHING, 'readyState says have nothing' );
	player.onloadedmetadata = function() {
		assert.ok( player.readyState >= player.HAVE_METADATA, 'readyState says got metadata' );
		QUnit.start();
	};
	player.load();
});

doubleAsyncTest('seek while playing triggers seeking, seeked', function(assert, player) {
	player.src = 'media/3seconds.ogv';
	var seekTargetTime = 1.5,
		didSeeking = false;

	player.onloadedmetadata = function() {
		// trigger a seek
		player.currentTime = seekTargetTime;
	};

	player.onseeking = function() {
		assert.ok( true, 'onseeking was fired' );
		assert.ok( !player.playing, 'player still thinks it is not playing');
		assert.ok( player.seeking, 'player thinks it is seeking');

		didSeeking = true;
	};

	player.onseeked = function() {
		assert.ok( true, 'onseeked was fired' );
		assert.ok( didSeeking, 'onseeking fired before onseek');
		assert.ok( !player.playing, 'player still thinks it is not playing');
		assert.ok( !player.seeking, 'player no longer thinks it is seeking');

		// @todo report updated time correctly after seeking on files with no audio
		//assert.ok( player.currentTime >= seekTargetTime, 'target time is at least what is expected' );

		QUnit.start();
	};

	player.play();
});

// @todo implement and test seeking while *not* playing
