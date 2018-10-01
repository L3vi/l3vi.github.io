<!doctype html>
<html lang="en">
<!--     The head is where you store information about the document.-->

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="styling.css" type="text/css">
    <meta name="viewport" content="width=device-width">
    
    <title>Home | l3vi.github.io</title>
</head>
<!--    The body contains the actual bulk of the content.-->

<body>
    <?php
    requires('header.php');
    ?>

    <div id="wrapper">
        <!--The header helps us identify the website-->
        <header>
            <div id="brand">Welcome... to l3vi.github.io!</div>
        </header>

        <!--The nav bar is for navigation within our website-->
        <nav>
        </nav>

        <!--Contains the main content of the page-->
        <main>
            <h2>Assignments</h2>
            <ul id="navList">
                <li><a href="https://l3vi.github.io/ePortfolio/">ePortfolio</a></li>
                <li><a href=cit230/index.html>CIT 230 projects</a></li>
                <li><a href=cit261/index.html>CIT 261 portfolio</a></li>
            </ul>
        </main>

        <!--The footer contains information about the site-->
        <footer>
            &copy; 2018 - Levi Stum
        </footer>
    </div>
</body>

</html>