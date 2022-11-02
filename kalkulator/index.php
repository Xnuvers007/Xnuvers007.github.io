<?php

session_start();
session_regenerate_id(true);
// Membuat perhitungan sederhana dengan PHP dan html

?>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <title>Perhitungan Sederhana</title>

    <link rel="stylesheet" href="./style.css">

</head>
<body>
    <h1 class="text-center"> Created by <a href="https://github.com/Xnuvers007/">Xnuvers007</a> ♥ </h1>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <form action="index.php" method="get">
        <center>
        <input class="masukan" type="number" name="angka1" placeholder="Masukan Angka Pertama">
        <select name="operasi">
            <option value="penjumlahan">+</option>
            <option value="pengurangan">-</option>
            <option value="perkalian">*</option>
            <option value="pembagian">/</option>
            <option value="modulus">%</option>
        </select>
        <input class="masukan" type="number" name="angka2" placeholder="Masukan angka ke kedua">
        <input class="hitng" type="submit" value="Hitung">
        <input class="hitng" type="reset" value="Reset" onclick="window.location.href='index.php'">
        </center>
    </form>
    <script>
        /* jangan dikosongkan bagian form input */
        function validasi_input(form){
            if (form.angka1.value == ""){
                alert("Angka pertama masih kosong!");
                form.angka1.focus();
                return (false);
            }
            if (form.angka2.value == ""){
                alert("Angka kedua masih kosong!");
                form.angka2.focus();
                return (false);
            }
            return (true);
        }
    </script>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Hasil Perhitungan</h3>
                    </div>
                    <div class="card-body">
                        <?php
                        // Membuat perhitungan sederhana dengan PHP dan html
                        if (isset($_GET['angka1']) && isset($_GET['angka2']) && isset($_GET['operasi'])) {
                            $angka1 = $_GET['angka1'];
                            $angka2 = $_GET['angka2'];
                            $operasi = $_GET['operasi'];
                            if ($operasi == "penjumlahan") {
                                $hasil = (int)$angka1 + (int)$angka2;
                            } elseif ($operasi == "pengurangan") {
                                $hasil = $angka1 - $angka2;
                            } elseif ($operasi == "perkalian") {
                                $hasil = $angka1 * $angka2;
                            } elseif ($operasi == "pembagian") {
                                $hasil = $angka1 / $angka2;
                            } elseif ($operasi == "modulus") {
                                $hasil = $angka1 % $angka2;
                            }
                            echo "<center><h1>$angka1 $operasi $angka2 = $hasil</h1></center>";
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Jam Digital</h3>
                    </div>
                    <div class="card-body">
                        <center>
                        <div class="Jam-digital">
                            <div id="clock">
                                <div id="hour"></div>
                                <div id="minute"></div>
                                <div id="second"></div>
                            </div>
                        </div>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    <!-- <center>
        <div class="Jam-digital">
            <div id="clock">
                <div id="hour"></div>
                <div id="minute"></div>
                <div id="second"></div>
            </div>
        </div>
    </center> -->
    <script src=./script.js></script>
    <!-- <?php
// membersihkan cache browser dan menghapus semua data yang tersimpan di browser
        header("Cache-Control: no-cache, must-revalidate");
    ?> -->
</body>
</html>