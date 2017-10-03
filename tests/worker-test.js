(function (Worker, WORKER, SOURCE) {
  var cases = {
    'd41d8cd98f00b204e9800998ecf8427e': '',
    '9e107d9d372bb6826bd81d3542a419d6': 'The quick brown fox jumps over the lazy dog',
    'e4d909c290d0fb1ca068ffaddf22cbd0': 'The quick brown fox jumps over the lazy dog.'
  };

  describe('#md5', function () {
    Object.keys(cases).forEach(function (hash) {
      it('should be equal', function (done) {
        var worker = new Worker(WORKER);
        worker.onmessage = function(event) {
          expect(event.data).to.be(hash);
          done();
        };
        worker.postMessage(SOURCE);
        worker.postMessage(cases[hash]);
      });
    });
  });
})(Worker, WORKER, SOURCE);
