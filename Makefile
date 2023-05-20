LIBRARY_INCLUDES := -I ./lib/AudioFile/

LXX_FLAGS :=

CXX_VERSION := -std=c++23
CXX_WARNINGS := -Wshadow \
			-Wall \
			-Wextra \
			-pedantic-errors \
			-pedantic

CXX := em++
CXX_FLAGS := $(CXX_VERSION) \
			 $(CXX_WARNINGS) \
			 $(LIBRARY_INCLUDES) \
			 $(LXX_FLAGS) \
			 -lembind \
			 -s WASM=1 \
			 --no-entry

FORMATTER := clang-format

SOURCE_DIRECTORY := ./src/wasm
WASM_DIST_DIRECTORY := ./wasmdist/wasm
TARGET_DIRECTORY := ./public/wasmmodule
MAIN_MODULE_NAME := module.js
MAIN_MODULE_WASM_NAME := module.wasm

CPP_FILES := $(shell find $(SOURCE_DIRECTORY) -regextype egrep \
			 -regex ".*\.(cc|cp|cxx|cpp|cPP|c\+\+|C)$$")
CPP_HEADER_FILES := $(shell find $(SOURCE_DIRECTORY) -regextype egrep \
				-regex ".*\.(hh|H|hp|hxx|hpp|HPP|h++|tcc)")
SOURCE_FILES := $(shell find $(SOURCE_DIRECTORY) -name '*.cpp')
SOURCE_DIRECTORY_STRUCTURE := $(shell find $(SOURCE_DIRECTORY) -type d)
DIST_DIRECTORY_STRUCTURE := $(patsubst $(SOURCE_DIRECTORY)/%,$(WASM_DIST_DIRECTORY)/%, \
								$(filter-out $(SOURCE_DIRECTORY),$(SOURCE_DIRECTORY_STRUCTURE)))

WASM_OBJECT_FILES := $(patsubst $(SOURCE_DIRECTORY)/%.cpp, $(WASM_DIST_DIRECTORY)/%.o, $(CPP_FILES))

$(WASM_DIST_DIRECTORY)/%.o: $(SOURCE_DIRECTORY)/%.cpp $(CPP_HEADER_FILES) | distdirs
	$(CXX) $(CXX_FLAGS) -c -o $@ $<

$(TARGET_DIRECTORY)/$(MAIN_MODULE_NAME): $(WASM_OBJECT_FILES) | distdirs
	$(CXX) $(CXX_FLAGS) -o $(WASM_DIST_DIRECTORY)/../$(MAIN_MODULE_NAME) $^
	cp $(WASM_DIST_DIRECTORY)/../$(MAIN_MODULE_WASM_NAME) $(TARGET_DIRECTORY)/$(MAIN_MODULE_WASM_NAME)
	# Prepare module.js
	echo "export default Module" >> $(WASM_DIST_DIRECTORY)/../$(MAIN_MODULE_NAME)
	sed -i -e "s/$(MAIN_MODULE_WASM_NAME)/wasmmodule\/$(MAIN_MODULE_WASM_NAME)/g" $(WASM_DIST_DIRECTORY)/../$(MAIN_MODULE_NAME)
	rm $(SOURCE_DIRECTORY)/$(MAIN_MODULE_NAME) -f || :
	cp $(WASM_DIST_DIRECTORY)/../$(MAIN_MODULE_NAME) $(SOURCE_DIRECTORY)/$(MAIN_MODULE_NAME)

wasmmain: $(TARGET_DIRECTORY)/$(MAIN_MODULE_NAME) | distdirs

wasmclean:
	rm $(WASM_DIST_DIRECTORY) -fr || :
	rm $(TARGET_DIRECTORY) -fr || :
	rm ./wasmdist -fr || :

distdirs:
	mkdir $(WASM_DIST_DIRECTORY) -p || :
	mkdir $(TARGET_DIRECTORY) -p || :

format:
	$(FORMATTER) -i $(SOURCE_FILES)

