#include <iostream>
#include <cstring>
#include <emscripten/em_macros.h>

int EMSCRIPTEN_KEEPALIVE cppten() {
    return 10;
}

int EMSCRIPTEN_KEEPALIVE cppaddone(int number) {
    return number + 1;
}

int EMSCRIPTEN_KEEPALIVE cppstrlen(const char* str) {
    return std::strlen(str);
}

int main() {
    std::cout << "Printing from wasm module!\n";
}

/*
int cppstrlen(const std::string& str) {
    return str.length();
}
*/

/*
EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("cppten", &cppten);
    emscripten::function("cppstrlen", &cppstrlen);
}
*/
