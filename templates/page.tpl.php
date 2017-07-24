<?php
  $render = render($page['content']);
  $striphtml = str_replace('&nbsp;', '', $render);
  $striphtml = str_replace(' ', '', $striphtml);
  $striphtml = trim($striphtml);

  $rendertab = '';
  $striptab = '';
  if ($tabs) {
    $rendertab = render($tabs);
    $striptab = drupal_html_to_text($rendertab);
  }
?>

<div id="page" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <!-- ______________________ HEADER _______________________ -->

  <header id="header">
    <div class="header-inner">
      <?php if ($logo): ?>
        <div id="logo">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
          </a>
        </div>
      <?php endif; ?>

      <?php if ($page['navigation']): ?>
        <nav id="navigation">
          <?php print render($page['navigation']); ?>
        </nav>
      <?php endif; ?>
    </div>
  </header> <!-- /header -->

  <!-- ______________________ MAIN _______________________ -->

  <?php if ($breadcrumb || $striphtml || ($title && !$is_front) || $action_links || $messages || $striptab || $page['highlighted'] || $page['sidebar_first'] || $page['sidebar_second']): ?>
    <section id="main">
      <div class="main-inner">
        <?php if ($breadcrumb || ($title && !$is_front) || $messages || $striptab || $action_links || $page['highlighted']): ?>
          <article id="content-header">
            <?php print $breadcrumb; ?>

            <?php if ($page['highlighted']): ?>
              <div id="highlighted"><?php print render($page['highlighted']) ?></div>
            <?php endif; ?>

            <?php print render($title_prefix); ?>
            <?php if ($title && !$is_front): ?>
              <h1 class="title"><?php print $title; ?></h1>
            <?php endif; ?>
            <?php print render($title_suffix); ?>

            <?php print $messages; ?>
            <?php print render($page['help']); ?>

            <?php if ($striptab): ?>
              <div id='tab' class="tabs"><?php print $rendertab; ?></div>
            <?php endif; ?>

            <?php if ($action_links): ?>
              <ul class="action-links"><?php print render($action_links); ?></ul>
            <?php endif; ?>
          </article> <!-- /#content-header -->
        <?php endif; ?>

        <?php if ($striphtml): ?>
          <article id="content-area">        
            <?php print $render; ?>
          </article>
        <?php endif; ?>

        <?php if ($page['sidebar_first']): ?>
          <article id="sidebar-first" class="lower-content">
            <?php print render($page['sidebar_first']); ?>
          </article>
        <?php endif; ?> <!-- /sidebar-first -->

        <?php if ($page['sidebar_second']): ?>
          <article id="sidebar-second" class="lower-content">
            <?php print render($page['sidebar_second']); ?>
          </article>
        <?php endif; ?> <!-- /sidebar-second -->
      </div>
    </section> <!-- /main -->
  <?php endif; ?>

  <!-- ______________________ FOOTER _______________________ -->

  <?php if ($page['footer']): ?>
    <footer id="footer">
      <?php print render($page['footer']); ?>
    </footer> <!-- /footer -->
  <?php endif; ?>

</div> <!-- /page -->
