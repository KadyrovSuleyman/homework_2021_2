QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('Тест не объекта', function (assert) {
		assert.deepEqual(plainify(5), undefined);
	})

	QUnit.test('Тест пустого объекта', function (assert) {
		assert.deepEqual(plainify({}), {});
	})

	QUnit.test('Тест объекта с числом', function (assert) {
		assert.deepEqual(plainify({number: 1}), {'number': 1});
	})

	QUnit.test('Тест объекта с большим числом', function (assert) {
		assert.deepEqual(plainify({bigint: 1n}), {'bigint': 1n});
	})

	QUnit.test('Тест объекта со строкой', function (assert) {
		assert.deepEqual(plainify({string: 'test string'}), {'string': 'test string'});
	})

	QUnit.test('Тест объекта с логическим значением', function (assert) {
		assert.deepEqual(plainify({bool: true}), {'bool': true});
	})

	QUnit.test('Тест объекта с неопределенным значение ', function (assert) {
		assert.deepEqual(plainify({foo: undefined}), {'foo': undefined});
	})

	QUnit.test('Тест объекта без вложенных свойств', function (assert) {
		assert.deepEqual(plainify({foo: 'bar'}), {'foo': 'bar'});
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});
	});

	QUnit.test('Тест объекта с одинарным вложением', function (assert) {
		const nested = {
			foo: 'bar',
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain = {
			'foo': 'bar',
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested), plain);
	});

	QUnit.test('Тест объекта с множественным вложением', function (assert) {
		const nested = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested), plain);
	});

	QUnit.test('Тест объекта с массивами', function (assert) {
		assert.deepEqual(plainify({foo: {nested: [1, 2]}}), {'foo.nested': [1, 2]});
	});

});
