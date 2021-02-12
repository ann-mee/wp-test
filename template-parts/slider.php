<?php

$slides = get_field('slide');

if ( $slides ){

	echo '<div class="slider" id="slider">';
		
	foreach( $slides as $slide ){

		echo '<div class="slider__item" style="background-image: url('.$slide['image']['url'].')">
			<div class="slider__item-wrapper">';
				if ( $slide['subheader'] ) echo '<h4 class="slider__item-subheader">' . $slide['subheader'] . '</h4>';
				if ( $slide['header'] ) echo '<h2 class="slider__item-header">' . $slide['header'] . '</h2>';
				if ( $slide['content'] ) echo '<div class="slider__item-content">' . $slide['content'] . '</div>';
				if ( !empty($slide['url']) ) {
					echo '<a href="' .  $slide['url']['url'] . '" class="slider__item-link"';
					if ( $slide['url']['target'] ) echo ' target="' . $slide['url']['target'] . '"';
					echo '>';
					if ( $slide['url']['title'] ) echo $slide['url']['title'];
					else echo 'More';
					echo '</a>';
				}
			echo '</div>
		</div>';

	}

	echo '</div>';
}
?>