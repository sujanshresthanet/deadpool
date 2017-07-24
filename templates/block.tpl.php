<?php
  $contentclass = '';
  if ($block->module !== 'system') {
    $contentclass .= 'content-block';
  }
  $striphtml = $content;
  $striphtml = strip_tags($striphtml,'<img><input><select><button><textarea><iframe><video><noempty>');
  $striphtml = str_replace('&nbsp;', '', $striphtml);
  $striphtml = str_replace(' ', '', $striphtml);
  $striphtml = trim($striphtml);
  if (!empty($striphtml)) {
?>
<?php if ($block->subject): ?>
  <div class="element-invisible block-id id-block-<?php print $block->module .'-'. $block->delta ?>" id="<?php print trim(strtolower(str_replace(' ', '-', drupal_html_to_text($block->subject)))); ?>"></div>
<?php endif;?>
<div id="block-<?php print $block->module .'-'. $block->delta ?>" class="<?php print $contentclass; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <div class="block-inner">

    <?php print render($title_prefix); ?>
    <?php if ($block->subject): ?>
      <div class='block-title-wrapper'>
        <h2 class="block-title"<?php print $title_attributes; ?>>
          <?php print $block->subject ?>
        </h2>
      </div>
    <?php endif;?>
    <?php print render($title_suffix); ?>

    <div class="content" <?php print $content_attributes; ?>>
      <?php print $content; ?>
    </div>

  </div>
</div> <!-- /block-inner /block -->
<?php
  }
?>