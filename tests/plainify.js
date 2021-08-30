'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('Тест не объекта', function (assert) {
		assert.deepEqual(plainify(5), undefined);
	})

	QUnit.test('Тест пустого объекта', function (assert) {
		assert.deepEqual(plainify({}), {});
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

});
