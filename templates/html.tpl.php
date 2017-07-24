<!DOCTYPE html>
<html<?php print $html_attributes . $rdf_namespaces; ?>>
<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
</head>
<body class="<?php print $classes; ?>" <?php print $attributes; ?>>
  <mark id = 'base-path' class = 'element-invisible'><?php print base_path();?></mark>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
  <div id='virtual-tag' class="element-invisible"><div class="replacement"></div></div>
</body>
</html>