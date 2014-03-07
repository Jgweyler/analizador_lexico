var assert = chai.assert;

suite('Tokens', function(){
  
  test('Funciona bexec.', function(){
    var input = "prueba";
	var regexp = /ba/;
	regexp.lastIndex = 0;

	assert.equal(regexp.bexec(input), null);
  });

  test('Funciona tokens', function(){
    var input = "var a = b;";
    var toke = "[{\"type\":\"name\",\"value\":\"var\",\"from\":0,\"to\":3},{\"type\":\"name\",\"value\":\"a\",\"from\":4,\"to\":5},{\"type\":\"operator\",\"value\":\"=\",\"from\":6,\"to\":7},{\"type\":\"name\",\"value\":\"b\",\"from\":8,\"to\":9},{\"type\":\"operator\",\"value\":\";\",\"from\":9,\"to\":10}]";
	var salida = JSON.stringify(input.tokens());

	assert.equal(toke, salida);
  });
  
  test('String.tokens(): Exccepción de error', function(){
    var input = "#ERROR#";
	var salida = "Syntax error near '#ERROR#'";

    chai.expect(function () { input.tokens() }).to.throw(salida);
  });
});

suite('Parser', function(){
  
  test('Parser', function(){
    var parse = make_parse();
	var input = "var a = 20;";
	var toke = "{\n    \"value\": \"=\",\n    \"arity\": \"binary\",\n    \"first\": {\n        \"value\": \"a\",\n        \"arity\": \"name\"\n    },\n    \"second\": {\n        \"value\": 20,\n        \"arity\": \"literal\"\n    }\n}";

	var salida, tree;
    try {
      tree = parse(input);
      salida = JSON.stringify(tree, ['key', 'name', 'message',
           'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
      salida = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
              'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

	assert.equal(toke, salida);
  });
  
  test('Error en el parser', function(){
    var parse = make_parse();
	var input = "error = $;";
	var toke = "\"Syntax error near \'$;\'\"";

	var salida, tree;
    try {
      tree = parse(input);
      salida = JSON.stringify(tree, ['key', 'name', 'message',
           'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
      salida = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
              'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

	assert.equal(toke, salida);
  });
});

