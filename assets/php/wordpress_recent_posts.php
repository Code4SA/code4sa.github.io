<?php
/** ****************************************** **
 *	@CONTACT FORM 	V1.0.0
 *	@AUTHOR			Dorin Grigoras
 *	@DATE			Friday, June 20, 2014
 ** ****************************************** **/
	@ini_set('display_errors', 0);
	@ini_set('track_errors', 0);
	@date_default_timezone_set('Europe/Bucharest'); 	// Used only to avoid annoying warnings.
	header('Content-Type: text/html; charset=UTF-8');	// UTF8 output

	// How many last blog posts to get?
	$limit 				= 3;

	// Blog Feed Url (example: http://yourblog.com/feed/)
	$rss_url			= 'http://wordpress.org/news/feed/';

	// Short Description max characters
	$short_desc_chars	= 100; 

	// Get XML Data
	$rss_data	= file_get_contents($rss_url);

	try {

		$xml = @new SimpleXMLElement($rss_data);

	} catch (Exception $e) {

		echo "Invalid RSS Link";

	}

	// vars
	$count 	= 0;
	$output = array();

	// Extract items from XML Object
	foreach($xml->channel->item as $items) {

		$output[$count]['title'] 					= (string)$items->title;
		$output[$count]['link'] 					= (string)$items->link;
		$output[$count]['pubDate'] 					= (string)$items->pubDate;
		$output[$count]['guid'] 					= (string)$items->guid;
		$output[$count]['description'] 				= (string)$items->description;
		$output[$count]['description_stripped'] 	= (string)strip_tags($items->description);
		$output[$count]['description_short']	 	= (string)strip_tags(substr($items->description,0, $short_desc_chars));

		$count++;
		if($count === $limit)
			break;

	}

	/* 
		OUTPUT - USABLE VARS

			$out['title']
			$out['link']
			$out['pubDate']
			$out['guid']
			$out['description_stripped']
			$out['description_short']

		You can use 'foreach' on your php script or you can set here a final array.
	*/
	foreach($output as $out) {
		// echo '<br>' . $out['title'];
		// echo '<br>' . $out['link'];
		// echo '<br>' . $out['pubDate'];
		// echo '<br>' . $out['guid'];
		// echo '<br>' . $out['description_stripped'];
		// echo '<br>' . $out['description_short'];
		// echo '<hr />';
	}
?>