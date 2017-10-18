<?php 

	try {
	
    	    $pdo = new PDO('mysql:host=localhost;dbname=database;encoding=utf8', 'root', '');
    	    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	    $pdo->setAttribute( PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC );
    	} catch( PDOException $e ) {
    	    echo 'ERROR: ' . $e->getMessage();        
    	};

	if (isset($_POST['gender']) && isset($_POST['age']) && isset($_POST['music']) && isset($_POST['movies']) && isset($_POST['color']) && isset($_POST['animal']) && isset($_POST['place']) && isset($_POST['worldview']) && isset($_POST['religion'])) {
    	
		$gender = $_POST['gender'];
		$age = $_POST['age'];
		$music = $_POST['music'];
		$movies = $_POST['movies'];
		$color = $_POST['color'];
		$animal = $_POST['animal'];
		$place = $_POST['place'];
		$worldview = $_POST['worldview'];
		$religion = $_POST['religion'];
	
		

    	$data = $pdo->prepare('INSERT INTO `stats`(`gender`, `age`, `music`, `movies`, `color`, `animal`, `place`, `worldview`, `religion`) VALUES (:gender, :age, :music, :movies, :color, :animal, :place, :worldview, :religion)');

    	$data->bindParam(':gender', $gender);
    	$data->bindParam(':age', $age);
    	$data->bindParam(':music', $music);
    	$data->bindParam(':movies', $movies);
    	$data->bindParam(':color', $color);
    	$data->bindParam(':animal', $animal);
    	$data->bindParam(':place', $place);
    	$data->bindParam(':worldview', $worldview);
    	$data->bindParam(':religion', $religion);
		$data->execute();
		header("Location: http://localhost/stats/results.html");

	} else if (isset($_GET['single'])) {
		$array = [];
		$data = $pdo->query('SELECT ' . $_GET['single'] . ', Count(*) as people FROM `stats` GROUP BY ' . $_GET['single']);
		$array = [];

		foreach($data->fetchAll() as $value) {
			$array[] = $value;	
		};

		echo json_encode($array);
	} else if (isset($_GET['compare1']) && isset($_GET['compare2']) && isset($_GET['compare3'])) {
		$array = [];
		$data = $pdo->query('SELECT ' . $_GET['compare1'] . ', Count(*) as people FROM `stats` WHERE ' . $_GET['compare2'] . '="' . $_GET['compare3'] .'" GROUP BY ' . $_GET['compare1']);
		$array = [];

		foreach($data->fetchAll() as $value) {
			$array[] = $value;	
		};

		echo json_encode($array);
	} else if (isset($_GET['asknumber'])) {
		$data = $pdo->query('SELECT Count(*) as number FROM `stats`');
		echo json_encode($data->fetchAll());
	} else {  
	    echo '
	    	  <head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" type="text/css" href="style/index.css">
				<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"> 
				<title>Error</title>
			  </head>
			  <body>
			  <div id="wrapper">
	    	  <header></header>
			  <main><h4 style="text-align: center; padding-top: 70px">You have to answer all the questions!</h4></main>
			  <footer>
				<a href="https://github.com/RGladys">
					<img id="git" src="images/github.png">
					<p>Site made by Radoslaw Gladys.</p>
				</a>
			  </footer>
			  </div>
			  </body>';
	};


	

?>