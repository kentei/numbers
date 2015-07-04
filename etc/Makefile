SRC = ../src/main.js ../src/startMenu.js ../src/game1Player.js
COMBINE = ../dest/game.js
COMPRESS = ../dest/game.min.js

all : $(COMPRESS)

$(COMBINE) : $(SRC)
	cat $^ > $@

$(COMPRESS) : $(COMBINE)
	java -jar custom_rhino.jar -c $< > $@

.PHONY: clean
clean :
	rm -f $(COMBINE) $(COMPRESS)
