var expect = chai.expect;
var url = '';

describe('Use Stories', function() {
    // this.timeout(60000);

    var server;

    before(function() {
        server = sinon.fakeServer.create();
    });

    after(function() {
        server.restore();
    });

    it('Validation Success: Check for valid email validation in all parameters', function(done) {
        var notificationUrl = '/api/retrievefornotifications';
        var formData = {
            teacher: 't3@teacher.com',
            notification: 'Hello students! @s5@student.com @s1@student.com'
        };
        var serverReturn = {
            recipients: ['s1@student.com', 's2@student.com', 's3@student.com']
        };

        server.respondWith('POST', notificationUrl, [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(serverReturn)
        ]);

        $.post(notificationUrl, formData, function(data, status, xhr) {
            expect(xhr.status).to.equal(200);
            done();
        });

        server.respond();
    });

    it('Validation Failed: Check for invalid email validation in all parameters', function(done) {
        var notificationUrl = '/api/retrievefornotifications';
        var formData = {
            teacher: 't3@teacher.com',
            notification: 'Hello students! @s5@student.com @s1@student.com'
        };
        var serverReturn = {
            message:
                'Invalid access. Required parameters `teacher, students`. Please refer to the documents'
        };

        server.respondWith('POST', notificationUrl, [
            206,
            { 'Content-Type': 'application/json' },
            JSON.stringify(serverReturn)
        ]);

        $.post(notificationUrl, formData, function(data, status, xhr) {
            expect(xhr.status).to.equal(206);
            expect(data).to.have.property('message');
            done();
        });
        server.respond();
    });

    it('As a teacher, I want to register one or more students to a specified teacher.', function(done) {
        var pass = {
            url: '/api/register',
            param: {
                teacher: 't1@teacher.com',
                students: ['s2@student.com', 's3@student.com']
            },
            status: 204,
            response: ''
        };

        server.respondWith('POST', pass.url, [
            pass.status,
            { 'Content-Type': 'application/json' },
            pass.response
        ]);

        $.post(pass.url, pass.param, function(res, status, xhr) {
            expect(xhr.status).to.equal(pass.status);
            expect(res).to.equal(undefined);
            done();
        });
        server.respond();
    });

    it('Single Teacher: As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).', function(done) {
        var pass = {
            url: '/api/commonstudents?teacher=t1@teacher.com',
            method: 'GET',
            status: 200,
            response: {
                students: ['s1@student.com']
            }
        };

        server.respondWith(pass.method, pass.url, [
            pass.status,
            { 'Content-Type': 'application/json' },
            JSON.stringify(pass.response)
        ]);

        $.get(pass.url, pass.param, function(res, status, xhr) {
            expect(xhr.status).to.equal(pass.status);
            expect(res).to.deep.equal(pass.response);
            done();
        });
        server.respond();
    });
    it('Multiple Teacher:  As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).', function(done) {
        var pass = {
            url:
                '/api/commonstudents?teacher=t1@teacher.com&teacher=t2@teacher.com',
            method: 'GET',
            status: 200,
            response: {
                students: ['s1@student.com', 's2@student.com']
            }
        };

        server.respondWith(pass.method, pass.url, [
            pass.status,
            { 'Content-Type': 'application/json' },
            JSON.stringify(pass.response)
        ]);

        $.get(pass.url, pass.param, function(res, status, xhr) {
            expect(xhr.status).to.equal(pass.status);
            expect(res).to.deep.equal(pass.response);
            done();
        });
        server.respond();
    });
    it('No common: As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).', function(done) {
        var pass = {
            url:
                '/api/commonstudents?teacher=t1@teacher.com&teacher=t2@teacher.com&teacher=t6@teacher.com',
            method: 'GET',
            status: 200,
            response: {
                students: []
            }
        };

        server.respondWith(pass.method, pass.url, [
            pass.status,
            { 'Content-Type': 'application/json' },
            JSON.stringify(pass.response)
        ]);

        $.get(pass.url, pass.param, function(res, status, xhr) {
            expect(xhr.status).to.equal(pass.status);
            expect(res).to.deep.equal(pass.response);
            done();
        });
        server.respond();
    });
    it('As a teacher, I want to suspend a specified student.', function(done) {
        var pass = {
            url: '/api/suspend',
            status: 204,
            method: 'POST',
            response: ''
        };

        server.respondWith(pass.method, pass.url, [
            pass.status,
            { 'Content-Type': 'application/json' },
            JSON.stringify(pass.response)
        ]);

        $.post(pass.url, pass.param, function(res, status, xhr) {
            expect(xhr.status).to.equal(pass.status);
            expect(res).to.equal(undefined);
            done();
        });
        server.respond();
    });
    it('Failed Scenario: multiple student suspension: As a teacher, I want to suspend a specified student.', function(done) {
        var pass = {
            url: '/api/suspend',
            status: 206,
            method: 'POST',
            response: {
                message:
                    'Invalid access. Required parameters `student`. Please refer to the documents.'
            }
        };

        server.respondWith(pass.method, pass.url, [
            pass.status,
            { 'Content-Type': 'application/json' },
            JSON.stringify(pass.response)
        ]);

        $.post(pass.url, pass.param, function(res, status, xhr) {
            expect(xhr.status).to.equal(pass.status);
            expect(res).to.deep.equal(pass.response);
            done();
        });
        server.respond();
    });
    it('As a teacher, I want to retrieve a list of students who can receive a given notification.', function(done) {
        var notificationUrl = '/api/retrievefornotifications';
        var formData = {
            teacher: 't3@teacher.com',
            notification: 'Hello students! @s5@student.com @s1@student.com'
        };
        var serverReturn = {
            recipients: ['s1@student.com', 's2@student.com', 's3@student.com']
        };

        server.respondWith('POST', notificationUrl, [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(serverReturn)
        ]);

        $.post(notificationUrl, formData, function(data) {
            expect(data).to.deep.equal(serverReturn);
            done();
        });

        server.respond();
    });
    it('With suspended student: As a teacher, I want to retrieve a list of students who can receive a given notification.', function(done) {
        var notificationUrl = '/api/retrievefornotifications';
        var formData = {
            teacher: 't3@teacher.com',
            notification: 'Hello students!'
        };
        var serverReturn = {
            recipients: []
        };

        server.respondWith('POST', notificationUrl, [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(serverReturn)
        ]);

        $.post(notificationUrl, formData, function(data) {
            expect(data).to.deep.equal(serverReturn);
            done();
        });
        server.respond();
    });
});
