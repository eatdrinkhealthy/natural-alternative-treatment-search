<h1>Naturopathic Cancer Treatment Site</h1>

<h2>Database - MongoLab</h2>
<p><a href="https://mongolab.com/welcome/">MongoLab</a> is a MongoDB service provider. They offer free and paid tiers.
</p>
<h3>Current Settings</h3>
<h4>Database</h4>
<p><strong>server: </strong>ds053178.mongolab.com</p>
<p><strong>port: </strong>53178</p>
<p><strong>database name: </strong>steve-marsh</p>
<h4>Database User</h4>
<p><strong>username: </strong>web-app</p>
<p><strong>password: </strong>36hjd;pq24y-kgasw-035uad</p>
<h3>Migrating to a new Mongo Database</h3>
<p>This application can run on any MongoDB database. It can be local, remote, or hosted in the cloud. All that is needed
    are the appropriate configuration settings.</p>
<p>The database the app will connect to is confgured in this file: <code>/server/common/datastore/mongolab.js</code></p>
<ol>
    <li>Create a database with the name <code>steve-marsh</code>.</li>
    <li>Create a user on the new database named <code>web-app</code> with the password
        <code>36hjd;pq24y-kgasw-035uad</code></li>
    <li>Edit <code>mongolab.js</code> and set the new databse <code>server</code> and <code>port</code> values</li>
</ol>
<p>Note: All the database parameters can be changed as long as they are also changed in <code>mongolab.js</code>.</p>

<h2>Hosting Service - Digital Ocean</h2>
<h3>Current Settings</h3>
<p>The app can be deployed and run from any directory. On unix-type servers it is recommended that the application be
    run like other applications.</p>
<p><strong>Install Path: </strong> <code>/opt/steve-marsh</code></p>
<h3>Migrating to a new Hosting Service</h3>
<p>The app can run on any DigitalOcean instance (Droplet), locally, or any other hosting service, like Amazon AWS, as
    long as the
    service supports NodeJS.</p>
<ol>
    <li>Launch/setup the new host instance. <em>Please see the appropriate host provider documentation for instructions
        on how to launch/setup instances.</em></li>
    <li>Log into the instance. <em>As an example, for DigitalOcean, when an instance is created you receive an email
        with the instance IP address, login name and password.</em></li>
    <li>Navigate to the desired installation directory. <em>For example,<code>/opt</code> for DigitalOcean</em></li>
    <li>Clone the app project from GitHub by running the command <code>git clone
        https://github.com/ldeavila/steve-marsh.git</code></li>
    <li>change directories into the project. <em>For example, <code>cd steve-marsh</code></em></li>
    <li>Install the project's dependencies with the command <code>npm install</code></li>
    <li>Install the forever node package with the command <code>npm -g forever</code></li>
</ol>
<h2>Running/Stopping the Application</h2>
<h3>Running</h3>
<ol>
    <li><code>cd /opt/steve-marsh</code></li>
    <li><code>forever start /server/server.js</code></li>
</ol>
<h3>Stopping</h3>
<ol>
    <li><code>cd /opt/steve-marsh</code></li>
    <li><code>forever start /server/server.js</code></li>
</ol>

