SRC = test1.js test2.js test3.js
COMBINE = main.js
COMPRESS = main.min.js

all : $(COMPRESS)

$(COMBINE) : $(SRC)
	cat $^ > $@

$(COMPRESS) : $(COMBINE)
	java -jar custom_rhino.jar -c $< > $@

.PHONY: clean
clean :
	rm -f $(COMBINE) $(COMPRESS)
