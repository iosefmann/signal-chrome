# Signal

> This add-on is very early in development. The only thing that will happen is the idle icon will appear and Chrome might throw an error for bad Javascript.

<table><tr><td><img src="https://raw.githubusercontent.com/joeymann/signal-chrome/master/images/idle128.png"</img> </td><td>SIGNAL</td></tr></table>

Signal is a browser extension for Chromium-based browsers that displays an icon in the toolbar that changes colour based on the trustworthiness of the website they are viewing.

It reads the URL of the page the user is reading, checks it against four lists, and changes the icon based on which list it shows up in.

## Categories for websites

### Trustworthy

The sites listed in trust.txt are known for high-quality journalism, regardless of their political leanings. Sites in this list will cause Signal to display a green icon.

### Satirical

The sites listed in satire.txt are organisations that produce humourous news-like content that is not intended to mislead. Sites in this list will cause Signal to display a yellow icon.

### Salt

The sites listed salt.txt are either news organisations based in countries with known problems with press freedom or have a poorer reputation with handling factual information and thus, extraordinary claims made on these sites should be *taken with a grain of salt*. Sites in this list will cause Signal to display a blue icon.

### False

The sites listed in false.txt are sites that maliciously report false information for either political or commercial gain. Sites in this list will cause Signal to display a red icon.